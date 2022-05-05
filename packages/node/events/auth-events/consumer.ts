import { AuthEvents, AuthEventsPayload } from "auth-types/events";
import Consumer from "consumer";

const events = Object.values(AuthEvents);

type Subscriber = {
  [eventName in AuthEvents]: (
    onMessageReceived: (message: AuthEventsPayload[eventName]) => void
  ) => Promise<void>;
};
class AuthConsumer {
  private consumer: Consumer<typeof AuthEvents>;

  subscribe: Subscriber;

  // subscribeToAll;

  constructor() {
    this.consumer = new Consumer(AuthEvents, "auth");
    const sub: Subscriber | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      sub[eventName] = async (
        onMessageReceived: (
          message: AuthEventsPayload[typeof eventName],
          key?: string
        ) => void
      ) => {
        await this.consumer.subscribe(eventName, onMessageReceived);
      };
    }
    this.subscribe = sub as Subscriber;
    // this.subscribeToAll = (
    //   onMessageReceived: (
    //     // TODO: Fix typing here to infer it from the AuthEventsPayload directly
    //     message:
    //       | AuthEventsPayload[AuthEvents.UserCreated]
    //       | AuthEventsPayload[AuthEvents.UserCreatedNewSession]
    //       | AuthEventsPayload[AuthEvents.UserLinkedAccountToOAuth2]
    //       | AuthEventsPayload[AuthEvents.UserSuspended],
    //     key?: string
    //   ) => void
    // ) => {
    //   this.consumer.subscribeToAll(onMessageReceived);
    // };
  }
}

export default AuthConsumer;
