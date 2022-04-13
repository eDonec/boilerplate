import { AuthDocument } from "api-types/auth-api/models/Auth";

export const suspendClient = (
  authClient: AuthDocument,
  suspention: {
    suspentionLiftTime: Date;
    suspentionReason: string;
  }
) => {
  authClient.isSuspended = true;
  authClient.suspentionLiftTime = suspention.suspentionLiftTime;
  authClient.suspentionReason = suspention.suspentionReason;

  return authClient.save();
};
