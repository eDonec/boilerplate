import { UserType } from "auth-types/models/User";
import { InitialUserData, UserRouteTypes } from "auth-types/routes/user";
import BucketSDK from "bucket-sdk";
import { NotFoundError } from "custom-error";
import producer from "events/producer";
import Auth from "models/Auth";
import User from "models/User";
import * as authZService from "services/authZ";
import { ACCESS_RESSOURCES } from "shared-types";

const fetchUploadToken = () => {
  const response = authZService.getUploadToken("image");

  return response.token;
};

export const createUser = async (
  authId: string,
  { avatar, phoneNumber, ...initialUserData }: InitialUserData = {}
) => {
  const existingUser = await User.findOne({ auth: authId });

  if (existingUser) return existingUser;
  let shouldDropPhoneNumber = false;

  if (phoneNumber) {
    shouldDropPhoneNumber = !!(await User.findOne({ phoneNumber }));
  }

  const userData: Omit<UserType, "_id"> = {
    ...initialUserData,
    phoneNumber: shouldDropPhoneNumber ? undefined : phoneNumber,
    auth: authId,
  };

  if (avatar) {
    const uploadToken = fetchUploadToken();
    const bucketSDK = new BucketSDK(uploadToken, fetchUploadToken);
    const avatarData = await bucketSDK.addByUrl({
      body: {
        url: avatar,
      },
    });

    userData.avatar = avatarData;
  }

  const user = await User.create(userData);
  const filesToPersist = [];

  if (user.avatar) filesToPersist.push(user.avatar.key);
  producer.emit.ClientCreated({
    ...user.toObject(),
    filesToPersist,
  });

  return user;
};

export const updateUser = async (
  authId: string,
  userData: UserRouteTypes["/user/:authID"]["PUT"]["body"]
): Promise<UserRouteTypes["/user/:authID"]["PUT"]["response"]> => {
  const staleUser = await User.findOneAndUpdate(
    { auth: authId },
    { ...userData, isActivated: true }
  );

  if (!staleUser)
    throw new NotFoundError({
      message: "User not found",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });
  const filesToPersist = [];
  const filesToDelete = [];

  if (userData.avatar && userData.avatar.key !== staleUser.avatar?.key) {
    filesToPersist.push(userData.avatar.key);
    if (staleUser.avatar?.key) filesToDelete.push(staleUser.avatar.key);
  }

  const maybeUser = await User.findOne({ auth: authId }).lean();

  if (!maybeUser)
    throw new NotFoundError({
      message: "User not found",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });

  producer.emit.ClientUpdated({ filesToPersist, filesToDelete, ...maybeUser });

  return maybeUser;
};

export const getUser = async (
  authId: string
): Promise<UserRouteTypes["/user/:authID"]["GET"]["response"]> => {
  const user = await User.findOne<UserType<true>>({ auth: authId })
    .populate("auth", "-password -sessions")
    .lean();

  if (!user || !user.auth)
    throw new NotFoundError({
      message: "User not found",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });

  return {
    ...user.auth,
    ...user,
    _id: user.auth._id,
  };
};

export const getUsers = async ({
  keyword = "",
  ...query
}: UserRouteTypes["/user/"]["GET"]["query"]): Promise<
  UserRouteTypes["/user/"]["GET"]["response"]
> =>
  User.findPaginated(query, [
    {
      $addFields: {
        auth: {
          $toObjectId: "$auth",
        },
      },
    },
    {
      $lookup: {
        from: Auth.collection.name,
        localField: "auth",
        foreignField: "_id",
        pipeline: [
          {
            $addFields: {
              isSuspended: {
                $gt: ["$suspensionLiftTime", new Date()],
              },
            },
          },
        ],
        as: "auth",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              $first: "$auth",
            },
            "$$ROOT",
          ],
        },
      },
    },
    {
      $match: {
        "role.name": { $ne: "GOD" },
        $or: [
          {
            firstName: { $regex: keyword, $options: "i" },
          },
          {
            lastName: { $regex: keyword, $options: "i" },
          },
          {
            email: { $regex: keyword, $options: "i" },
          },
        ],
      },
    },
    {
      $addFields: {
        _id: {
          $first: "$auth._id",
        },
      },
    },
    {
      $project: {
        auth: 0,
        sessions: 0,
        password: 0,
      },
    },
  ]);

export const deleteUser = async (authId: string) => {
  const deleteduser = await User.findOneAndDelete({ auth: authId });

  if (!deleteduser)
    throw new NotFoundError({
      message: "User not found",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });

  const filesToDelete = [];

  if (deleteduser.avatar?.key) filesToDelete.push(deleteduser.avatar.key);
  producer.emit.ClientDeleted({ filesToDelete });
};

export async function getUnpaginatedMinimalUsers(): Promise<
  UserRouteTypes["/user/unpaginated-minimal-users"]["GET"]["response"]
> {
  return User.aggregate<{
    _id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  }>([
    {
      $addFields: {
        auth: {
          $toObjectId: "$auth",
        },
      },
    },
    {
      $lookup: {
        from: Auth.collection.name,
        localField: "auth",
        foreignField: "_id",
        as: "auth",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              $first: "$auth",
            },
            "$$ROOT",
          ],
        },
      },
    },
    {
      $match: {
        "role.name": { $ne: "GOD" },
      },
    },
    {
      $project: {
        _id: {
          $first: "$auth._id",
        },
        email: 1,
        firstName: 1,
        lastName: 1,
        phoneNumber: 1,
      },
    },
  ]);
}

export const isPhoneNumberAvailable = async (
  phoneNumber: string
): Promise<
  UserRouteTypes["/user/is-phonenumber-available"]["GET"]["response"]
> => {
  const maybeUser = await User.findOne({ phoneNumber });

  return {
    available: !maybeUser,
  };
};
