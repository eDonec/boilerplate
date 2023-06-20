import { LeanAuthDocument } from "../models/Auth";
import { LeanUserDocument, UserType } from "../models/User";

export type PopulatedUserDocument = Omit<
  LeanUserDocument & LeanAuthDocument,
  "auth" | "password" | "sessions"
>;

export type UserRouteTypes = {
  "/user/": {
    GET: {
      query: {
        page?: string;
        limit?: string;
        "sort-direction"?: string;
        "sort-field"?: string;
        keyword?: string;
      };
      response: {
        items: Array<
          Omit<
            LeanUserDocument & LeanAuthDocument,
            "auth" | "password" | "sessions"
          >
        >;
        page: number;
        hasNextPage: boolean;
        totalItems: number;
        totalPages: number;
      };
    };
  };
  "/user/:authID": {
    PUT: {
      body: {
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        avatar?: {
          key: string;
          type: string;
          name: string;
          _id: string;
          url: string;
        };
      };

      response: LeanUserDocument;
      params: {
        authID: string;
      };
    };
    GET: {
      response: Omit<
        LeanUserDocument & LeanAuthDocument,
        "auth" | "password" | "sessions"
      >;
      params: {
        authID: string;
      };
    };
  };
  "/user/me": {
    PUT: {
      body: {
        firstName?: string;
        lastName?: string;
        phoneNumber: string;
        avatar?: {
          key: string;
          type: string;
          name: string;
          _id: string;
          url: string;
        };
      };

      response: LeanUserDocument;
    };
  };
  "/user/unpaginated-minimal-users": {
    GET: {
      response: Array<{
        _id: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        email?: string;
      }>;
    };
  };
  "/user/is-phonenumber-available": {
    GET: {
      query: {
        phoneNumber: string;
      };
      response: {
        available: boolean;
      };
    };
  };
};

export type InitialUserData = Omit<UserType, "_id" | "auth" | "avatar"> & {
  avatar?: string;
};
