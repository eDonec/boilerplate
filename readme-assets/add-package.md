# Adding a package to an app

<!-- Table of Contents -->

## :notebook_with_decorative_cover: Table of Contents

- [:book: All Apps](#all-apps)
- [:memo: NextJS Apps](#nextjs-apps)
- [:memo: CRA Apps](#cra-apps)

<!-- All Apps -->

## **All Apps**

1. Navigate to app level `package.json` file.
2. Add the package name to the `dependencies` object with a `*` (asterisk) as a version.
3. Run `yarn` at the root level.

### Example

To add the `shared-types` package to an app, add `"shared-types" : "*"` to the dependencies object.

```json
{
  "name": "my-app",
  "version": "0.0.0",
  "license": "MIT",
  "private": true,
  "scripts": {
    "lint": "eslint --fix",
    "test": "jest --coverage"
  },
  "dependencies": {
    "shared-types": "*",    <== Add This
  }
}
```

Then run `yarn` at the root level.

```bash
yarn
```

**Note**

For **NextJS** and **CRA** apps, the following extra configuration need to be done.

<!-- Next Apps -->

## **NextJS Apps**

1. Navigate to app level `next.config.js` file.
2. Append the package name to the existing `next-transpile-modules` array.

**Example**

To add the `shared-types` package to a NextJS app, append `shared-types` to the array.

```js
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")([
 "core-ui",
 "core-utils",
 "core-hooks",
 "core-next-components",
 "shared-types"    <== Add This
]);

...
```

<!-- CRA Apps -->

## **CRA Apps**

1. Navigate to app level `craco.config.js` file.
2. Append the package name to the existing `modules` array. **Note** : package name must be declared as a relative path from the `packages` folder.

**Example**

To add the `shared-types` (which resides in `packages/shared-types`) package to a CRA app, append `shared-types` to the array.

```js
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const modules = [
 "browser/core-ui",
 "browser/core-utils",
 "browser/core-hooks",
 "browser/core-next-components",
 "node/shared-types"    <== Add This
];

...
```

To add the `auth-sdk` (which resides in `packages/SDK/node/auth-sdk`) package to a CRA app, append `SDK/node/auth-sdk` to the array.

```js
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const modules = [
  "browser/core-ui",
  "browser/core-utils",
  "browser/core-hooks",
  "browser/core-next-components",
  "node/shared-types",
  "SDK/node/auth-sdk"    <== Add This
];

...
```
