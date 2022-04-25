# Server auth

## Table of content

- [Server auth](#server-auth)
  - [Table of content](#table-of-content)
  - [Schemas](#schemas)
    - [Role](#role)
    - [Access](#access)
      - [FULL_ACCESS constant](#full_access-constant)
      - [Role ressource access' meta](#role-ressource-access-meta)
    - [Auth](#auth)
  - [Default roles](#default-roles)
    - [God](#god)
    - [Public](#public)
  - [Types](#types)
    - [IAuthServerMiddleware](#iauthservermiddleware)
      - [Defenition](#defenition)

## Schemas

### Role

| Field Name | Type     | description              | Required? |
| ---------- | -------- | ------------------------ | --------- |
| name       | string   | Role name                | true      |
| access     | ACCESS[] | array of access controls | true      |

### Access

| Field Name | Type                                                  | description                                                        | Required? |
| ---------- | ----------------------------------------------------- | ------------------------------------------------------------------ | --------- |
| ressource  | string                                                | the name of the ressource in question or \* for all the ressources | true      |
| privileges | ["READ" \| "WRITE" \| "DELETE \| "GRANT" \| "REVOKE"] | List of privileges on that ressource                               | true      |
| meta\*     | any                                                   | further restrictions on ressource                                  | true      |

\*meta needs to be documented on each step

#### FULL_ACCESS constant

The full access constant is an array containing all the privileges that can be assigned for convinience

#### Role ressource access' meta

```typescript
  meta?: {
    grantRolesList?: ["RoleNames"];
    revokeRolesList?: ["RoleNames"];
  }
```

### Auth

| Field Name                 | Type                                                                 | description                          | Required? |
| -------------------------- | -------------------------------------------------------------------- | ------------------------------------ | --------- |
| authType                   | "USER"\|"APP"                                                        | a user auth or an app auth           | true      |
| email                      | string                                                               | email                                | false     |
| userName                   | string                                                               | userName                             | false     |
| password                   | string                                                               | password                             | false     |
| authProvider               | ["CLASSIC"\| "Google"\| "FACEBOOK"\| "TWITTER"\| "LINKEDIN"\| "APP"] | the list of available auth providers | true      |
| providerId                 | `{provider: AUTH_PROVIDERS; id: string;}`                            | third party ids                      | false     |
| sessions                   | string[]                                                             | array of session ids                 | true      |
| role                       | RoleType                                                             | Role Object                          | true      |
| customAccessList           | ACCESS[]                                                             | extentable access list               | false     |
| isActive                   | boolean                                                              | has the account been activated       | true      |
| expirationDate             | Date                                                                 | an expiration date for app accounts  | true      |
| isBanned                   | boolean                                                              | self explanatory                     | true      |
| isSuspended                | boolean                                                              | self explanatory                     | false     |
| suspentionLiftTime         | Date                                                                 | self explanatory                     | false     |
| suspentionReason           | string                                                               | self explanatory                     | false     |
| numberOfUnsuccessfulTrials | number                                                               | self explanatory                     | false     |
| lastTrialSince             | Date                                                                 | lastTrialSince                       | true      |

## Default roles

### God

The god role is the super super admin the one who has all the priveleges

### Public

The public role is the default role for all newly created clients

## Types

### IAuthServerMiddleware

IAuthServerMiddleware is a surtype of IMiddleware that is a function of params (req, res, next) where req is Express's Request (Do not confuse with Express.Request from the namespace Express) res is Express's Response and next is Express's NextFunction

The added feature to this middleware is that it assumes that the res variable contains a the currentAuth in its locals.

==> res.locals = { currentAuth: AuthDocument }

==> currentAuth is found and has its role populated on a previous middleware

#### Defenition

```typescript
type IAuthServerMiddleware<
  R = Request,
  Locals = { currentAuth: AuthDocument },
  Body = any,
  B = any
> = IMiddleware<R, Response<Body, Locals>, B>;
```
