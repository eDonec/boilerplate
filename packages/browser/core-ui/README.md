<!-- core-ui -->

# core-ui

<!-- Modal -->

## Modal

#### Import

```typescript
import Modal from "core-ui/Modal";
```

<!-- Modal-Usage -->

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

<!-- Modal-API -->

#### API

<!-- Modal-Props -->

##### Props

| Name        | Type       | Description                      | Required |
| ----------- | ---------- | -------------------------------- | -------- |
| isOpen      | boolean    | Open and close the Modal .       | True     |
| handleClose | function() | fired when the Modal is opening. | True     |

<!--  ModalProps-Types -->

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

---

<!-- Getting Started -->

<!-- Alert Dialog -->

## Alert Dialog

#### Import

```typescript
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";
```

<!-- Alert-Dialog-Usage -->

#### Example Usage

```typescript
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";

const HomePage = () => {
  const [submitModalProps, handleSubmit] = useAlertDialog(onSubmit);

  return (
    <div>
      <AlertDialog
        title="title"
        message="  Never gonna give you up Never gonna let you down Never gonna run
        around and desert you Never gonna make you cry Never gonna say goodbye
        Never gonna tell a lie and hurt you Never gonna give you up Never
        gonna let you down Never gonna run around and desert you Never gonna
        make you cry Never gonna say goodbye Never gonna tell a lie and hurt
        you"
        confirmMessage="Confirmer"
        cancelMessage="Annuler"
        {...submitModalProps}
      />
    </div>
  );
};

export default HomePage;
```

<!-- AlertDialog-API -->

#### API

<!-- AlertDialog-Props -->

##### Props

| Name           | Type       | Description                                                                       | Required |
| -------------- | ---------- | --------------------------------------------------------------------------------- | -------- |
| title          | string     | An accessible name to be announced when the dialog is opened.                     | True     |
| message        | string     | An accessible description to be announced when the dialog is opened.              | True     |
| confirmMessage | string     | An accessible confirmation button when the dialog is opened.                      | True     |
| cancelMessage  | string     | An accessible return button when the dialog is opened.                            | True     |
| onSubmit       | function() | Set a submition to be invoked when the specified button of the dialog is pressed. | True     |

<!-- Screenshots -->

#### :camera: Screenshots

<div  align="center">

<img src="../../../readme-assets/AlertDialog.gif" alt="screenshot" />

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
