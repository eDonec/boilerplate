# Authenticator Package

The Authenticator package provides components and utilities to handle authentication and authorization in React applications.

## Table of Contents

- [Authenticator Package](#authenticator-package)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Components](#components)
      - [AuthenticatorProvider](#authenticatorprovider)
      - [Authenticator](#authenticator)
        - [Authenticator Props](#authenticator-props)
      - [AuthGuarded](#authguarded)
        - [Props](#props)
    - [Authentication Hooks](#authentication-hooks)
      - [useLogout](#uselogout)
      - [useAuthStatus](#useauthstatus)
      - [useAuthClient](#useauthclient)
      - [useAddAuthEventListener](#useaddautheventlistener)
      - [useAccessMatcher](#useaccessmatcher)
      - [UserDetailsForm](#userdetailsform)
        - [UserDetailsForm Props](#userdetailsform-props)
      - [UserDetailsGuarded](#userdetailsguarded)
        - [UserDetailsGuarded Props](#userdetailsguarded-props)
  - [Peer dependencies](#peer-dependencies)

## Usage

### Components

#### AuthenticatorProvider

To use the Authenticator package, you need to wrap your application with the AuthenticatorProvider component, which provides an authentication context for the rest of the application. The AuthenticatorProvider component requires some props:

- **mainApi**: An instance of ApiSDK to be used for authentication.
- **authDomain**: The authentication domain name, which should be a string that identifies the specific authentication domain used by the application.
- **role**: (Optional) The minimum role required to accept the user.
- **access**: (Optional) The access level required to accept the user.
- **preventLoadingUntilInitiated** (Optional) A boolean value that determines whether the application should be prevented from loading until the AuthenticatorProvider is initiated. If this value is set to true, the application will be prevented from loading until the AuthenticatorProvider is initiated. If this value is set to false, the application will be allowed to load even if the AuthenticatorProvider is not initiated. The default value is false.

```tsx
import { AuthenticatorProvider } from "authenticator";
import Api from "api";

function App() {
  return (
    <AuthenticatorProvider mainApi={Api.mainApi} authDomain="client">
      {/* your app components here */}
    </AuthenticatorProvider>
  );
}
```

#### Authenticator

Once the AuthenticatorProvider is set up, you can use the Authenticator component anywhere in the descendant of the AuthenticatorProvider to handle authentication flows. The Authenticator needs no props to run.

example:

```tsx
import { Authenticator } from "authenticator";

function MyComponent() {
  return (
    <div>
      // some stuff in here
      <Authenticator />
    </div>
  );
}
```

this will give you an authentication form that will never disappear.

##### Authenticator Props

| Prop               | Type                                                          | Default                                                                                            | Is Required |
| ------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- |
| loginButtonText    | string                                                        | Log in                                                                                             | false       |
| signUpButtonText   | string                                                        | Sign up                                                                                            | false       |
| facebookText       | string                                                        | Continue with Facebook                                                                             | false       |
| googleText         | "signin_with" or "signup_with" or "continue_with" or "signin" | continue_with                                                                                      | false       |
| seperatorText      | string                                                        | OR                                                                                                 | false       |
| errorText          | React.Node                                                    | Oups! An error occured while trying to connect! Please try again, or use a different login method. | false       |
| onSuccessfullLogin | () => void                                                    | undefined                                                                                          | false       |

#### AuthGuarded

The `AuthGuarded` component is a React functional component that provides a basic authentication mechanism. This component is intended to wrap the child components that should only be rendered if the user is authenticated. If the user is not authenticated, the component will display a modal with a login form that allows the user to authenticate.

##### Props

This component accepts only one prop:

- `children`: a React component or multiple React components to be rendered.

To use the `AuthGuarded` component, wrap the components you want to protect inside the `AuthGuarded` component. When the user is authenticated, the wrapped components will be rendered. If the user is not authenticated, the `AuthGuarded` component will display a modal with a login form. The `isOpen` prop of the `Modal` component in the `AuthGuarded` component is controlled by the `isOpen` state, which is initially set to `false`.

```tsx
import { AuthGuarded } from "authenticator";

function App() {
  return (
    <div>
      <AuthGuarded
        onSuccessfullLogin={() => {
          console.log("user authenticated!");
        }}
      >
        <a href="some-private-link">
          A link that leads to place that needs auth
        </a>
      </AuthGuarded>
    </div>
  );
}
```

This component also relies on the `useAuthStatus` hook from the [hooks module](#useauthstatus) to determine the current authentication status of the user. If the user is already authenticated, the wrapped components will be rendered immediately. If not, the AuthGuarded component will render a modal with a login form when that child is clicked.

### Authentication Hooks

The Authenticator package provides several hooks that you can use in your application to access and manage the user's authentication status.

#### useLogout

The `useLogout` hook returns a function that can be used to logout the user from the application. The function returns a Promise that will be resolved when the user is successfully logged out.

```tsx
import { useLogout } from "authenticator";

const LogoutButton = () => {
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    // do something after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
};
```

#### useAuthStatus

The `useAuthStatus` hook returns an object containing information about the user's authentication status.

```tsx
import { useAuthStatus } from "authenticator";

const MyComponent = () => {
  const { isLoggedIn, isLoading, isInitiated } = useAuthStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isInitiated) {
    return <div>Authenticator not initiated.</div>;
  }

  if (isLoggedIn) {
    return <div>Welcome back!</div>;
  }

  return <div>Please login to continue.</div>;
};
```

#### useAuthClient

The `useAuthClient` hook returns the current authentication state of the user, including their user object and access token.

```tsx
import { useAuthClient } from "authenticator";

const UserProfile = () => {
  const authClient = useAuthClient();

  if (!authClient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Username: {authClient.userName}</p>
      <p>Email: {authClient.email}</p>
      <p>Access Token: {authClient.accessToken}</p>
      <p>Phone Number: {authClient.user.phoneNumber}</p>
    </div>
  );
};
```

#### useAddAuthEventListener

The `useAddAuthEventListener` hook adds an event listener to the authentication system. You can use this hook to execute a specific function when an event occurs. There are several different events that you can listen for, including `onLogin`, `onLogout`, `onAuthAction`, `onAuthStatusChanged`, and `onAuthActionChanged`.

```tsx
import { useAddAuthEventListener } from "authenticator";

const MyComponent = () => {
  useAddAuthEventListener("onLogin", (authClient) => {
    console.log(`User ${authClient.authId} logged in.`);
  });

  useAddAuthEventListener("onLogout", () => {
    console.log("User logged out.");
  });

  useAddAuthEventListener("onAuthActionChanged", (authAction) => {
    console.log(`Auth action changed to ${authAction}.`);
  });

  return <div>My Component</div>;
};
```

#### useAccessMatcher

The `useAccessMatcher` hook returns a function that can be used to check if the user has access to a specific resource or privilege. The function takes an object with two optional parameters: `ressource` and `privileges`.

```tsx
import { useAccessMatcher } from "authenticator";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

const MyComponent = () => {
  const checkAccess = useAccessMatcher();

  const canAccess = checkAccess({
    ressource: ACCESS_RESSOURCES.USERS,
    privileges: PRIVILEGE.READ,
  });

  if (!canAccess) {
    return <div>You do not have access to this resource.</div>;
  }

  return <div>My Component</div>;
};
```

#### UserDetailsForm

Once the AuthenticatorProvider is set up, you can use the Authenticator component anywhere in the descendant of the AuthenticatorProvider to handle authentication flows. The Authenticator needs no props to run.

example:

```tsx
import { UserDetailsForm } from "authenticator";

function MyComponent() {
  return (
    <div>
      // some stuff in here
      <UserDetailsForm />
    </div>
  );
}
```

this will give you an user details form form that will never disappear.

##### UserDetailsForm Props

| Prop                       | Type       | Default   | Is Required |
| -------------------------- | ---------- | --------- | ----------- |
| className                  | string     |           | false       |
| submitText                 | string     | Submit    | false       |
| onSuccessfullProfileUpdate | () => void | undefined | false       |

#### UserDetailsGuarded

Similar to Auth guarded it will only render the children if the user is connected and has a profile.
**PS: if the user is not connected it will behave as `AuthGuarded` first, then check for profile and render the `UserDetailsFrom` in modal second.**

**example:**

```tsx
import { UserDetailsGuarded } from "authenticator";

function MyComponent() {
  return (
    <div>
      // some stuff in here
      <UserDetailsGuarded
        onSuccessfullProfileUpdate={() => {
          console.log("User connected and have a full profile");
        }}
      >
        <div>
          some stuff that will only be rendered if the user is connected and has
          a profile
        </div>
      </UserDetailsGuarded>
    </div>
  );
}
```

##### UserDetailsGuarded Props

| Prop                       | Type                               | Default   | Is Required                          |
| -------------------------- | ---------------------------------- | --------- | ------------------------------------ |
| requiredAttributes         | array of user attributes _(typed)_ | undefined | _if isActive is undefined_           |
| isActive                   | boolean                            | undefined | _if requiredAttributes is undefined_ |
| onSuccessfullProfileUpdate | () => void                         | undefined | false                                |
| onSuccessfullProfileUpdate | function                           |           | false                                |

## Peer dependencies

- core-ui/Modal
- forms/Input
- server-sdk
- auth-types
- auth-sdk
- shared-types
