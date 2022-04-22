<!-- core-ui -->

# core-ui

<!-- Modal -->

## Modal

#### Import

```typescript
import Modal from "core-ui/Modal";
```

<!-- RawSelect-Usage -->

#### Example Usage

```typescript
import { useState } from "react";

import { Button } from "core-ui";
import Modal from "core-ui/Modal";

const HomePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Toggle modal</Button>
      <Modal isOpen={open} handleClose={() => setOpen(false)}>
        <p>
          Never gonna give you up Never gonna let you down Never gonna run
          around and desert you Never gonna make you cry Never gonna say goodbye
          Never gonna tell a lie and hurt you Never gonna give you up Never
          gonna let you down Never gonna run around and desert you Never gonna
          make you cry Never gonna say goodbye Never gonna tell a lie and hurt
          you
        </p>
      </Modal>
    </div>
  );
};

export default HomePage;
```

<!-- RawSelect-API -->

#### API

<!-- RawSelect-Props -->

##### Props

| Name        | Type       | Description                      | Required |
| ----------- | ---------- | -------------------------------- | -------- |
| isOpen      | boolean    | Open and close the Modal .       | True     |
| handleClose | function() | fired when the Modal is opening. | True     |

<!--  SelectProps-Types -->

### Types

`TRule` : refer to <a href='../../node/field-validator/README.md'>**this guide**</a>.

<!-- Screenshots -->

#### :camera: Screenshots

<div  align="center">

<img src="../../../readme-assets/modal.gif" alt="screenshot" />

</div>

## :hammer_and_wrench: Getting Started

To add a package to an app, please follow <a href='../../../readme-assets/add-package.md'>**this guide**</a>.

<!--  Running project Tests -->

## :microscope: Running project Tests

To run tests, run the following command

```bash
yarn workspace core-ui test -watch
```

<!-- Getting Started -->