# Server auth

## Schemas

### Role

| Field Name | Type     | description              | Required? |
| ---------- | -------- | ------------------------ | --------- |
| name       | string   | Role name                | true      |
| access     | ACCESS[] | array of access controls | true      |

### Access

| Field Name | Type                                      | description                                                        | Required? |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------ | --------- |
| ressource  | string                                    | the name of the ressource in question or \* for all the ressources | true      |
| privileges | ["READ" \| "WRITE" \| "DELETE \| "GRANT"] | List of privileges on that ressource                               | true      |
| meta\*     | any                                       | further restrictions on ressource                                  | true      |

\*meta needs to be documented on each step

#### Role ressource access' meta

```typescript
  meta?: {
    grantRolesList?: ["RoleNames"];
    revokeRolesList?: ["RoleNames"];
  }
```

### Auth

| Field Name                 | Type                                                      | description                          | Required? |
| -------------------------- | --------------------------------------------------------- | ------------------------------------ | --------- |
| authType                   | "USER"\|"APP"                                             | a user auth or an app auth           | true      |
| email                      | string                                                    | email                                | false     |
| userName                   | string                                                    | userName                             | false     |
| password                   | string                                                    | password                             | false     |
| authProvider               | ["CLASSIC"\| "FACEBOOK"\| "TWITTER"\| "LINKEDIN"\| "APP"] | the list of available auth providers | true      |
| providerId                 | `{provider: AUTH_PROVIDERS; id: string;}`                 | third party ids                      | false     |
| sessions                   | string[]                                                  | array of session ids                 | true      |
| role                       | RoleType                                                  | Role Object                          | true      |
| customAccessList           | ACCESS[]                                                  | extentable access list               | false     |
| isActive                   | boolean                                                   | has the account been activated       | true      |
| expirationDate             | Date                                                      | an expiration date for app accounts  | true      |
| isBanned                   | boolean                                                   | self explanatory                     | true      |
| isSuspended                | boolean                                                   | self explanatory                     | false     |
| suspentionLiftTime         | Date                                                      | self explanatory                     | false     |
| suspentionReason           | string                                                    | self explanatory                     | false     |
| numberOfUnsuccessfulTrials | number                                                    | self explanatory                     | false     |
| lastTrialSince             | Date                                                      | lastTrialSince                       | true      |

## Default roles

### God

The god role is the super super admin the one who has all the priveleges

### Public

The public role is the default role for all newly created clients
