# GDPRConsent

The GDPRConsent package is used to provide an interface to accept or decline the use of cookies and other tracking technologies.
The package's name is simply `gdpr` and it exports two components, `GDPRConsent` as a default export and `useConsent` as a named one.

## Table of Contents

- [GDPRConsent](#gdprconsent)
  - [Table of Contents](#table-of-contents)
  - [Component](#component)
    - [Component Usage](#component-usage)
    - [Component Props](#component-props)
    - [Component Return Value](#component-return-value)
    - [Component Example](#component-example)
  - [Hook](#hook)
    - [Hook Usage](#hook-usage)
    - [Hook Props](#hook-props)
    - [Hook Return Value](#hook-return-value)

## Component

### Component Usage

```tsx
import GDPRConsent from "gdpr";

<GDPRConsent />;
```

### Component Props

None

### Component Return Value

Returns the GDPR Consent component.

### Component Example

this component is made to live in the root of the project

- `./src/pages/_app.page.tsx` for nextjs
- `./src/index.tsx` for cra apps

```tsx
import { useState } from "react";
// .. imports
import GDPRConsent from "gdpr";

// ..overhead

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* ..overhead */}
      <TranslationProvider>
        <GDPRConsent /> {/* <== add this! */}
        <Component {...pageProps} />
      </TranslationProvider>
      {/* ..overhead */}
    </>
  );
}
export default MyApp;
```

## Hook

### Hook Usage

```tsx
import { useConsent } from "gdpr";

import React from "react";

const SomeComponentThatNeedsConsent = () => {
  const { isConsent } = useConsent();

  return <div>Do something with the consent value</div>;
};

export default SomeComponentThatNeedsConsent;
```

### Hook Props

None

### Hook Return Value

| variable  | type    | description                                                                                                  |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| isConsent | boolean | returns a state that contains the user consent status for the app, `false` for `decline`, `true` for `agree` |
