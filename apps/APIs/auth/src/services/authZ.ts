import { AuthDocument } from "auth-types/models/Auth";
import producer from "events/producer";

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

  producer.emit.UserSuspended({
    authId: authClient.id,
    suspentionLiftTime: suspention.suspentionLiftTime,
    suspentionReason: suspention.suspentionReason,
  });

  return authClient.save();
};
