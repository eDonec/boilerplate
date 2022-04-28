<!-- Alert Dialog -->

# Alert Dialog

<!-- Table of content -->

## Table of content

- [Alert Dialog](#alert-dialog)
  - [Table of content](#table-of-content)
  - [Alert Dialog](#alert-dialog-1)
    - [Import](#import)
    - [Example Usage](#example-usage)
    - [API](#api)
      - [Props](#props)
    - [Types](#types)
      - [:camera: Screenshots](#camera-screenshots)
  - [:hammer_and_wrench: Getting Started](#hammer_and_wrench-getting-started)
  - [:microscope: Running project Tests](#microscope-running-project-tests)

<!-- AlertDialog -->

## Alert Dialog

<!-- AlertDialog-Import -->

### Import

```typescript
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";
```

<!-- AlertDialog-Usage -->

### Example Usage

```typescript
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";

const HomePage = () => {
  const onSubmit: SubmitHandler<{ start: string }> = (value) =>
    // eslint-disable-next-line no-console
    console.log(value);
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

### API

<!-- AlertDialog-Props -->

#### Props

| Name           | Type       | Description                                                                       | Required |
| -------------- | ---------- | --------------------------------------------------------------------------------- | -------- |
| title          | string     | An accessible name to be announced when the dialog is opened.                     | True     |
| message        | string     | An accessible description to be announced when the dialog is opened.              | True     |
| confirmMessage | string     | An accessible confirmation button when the dialog is opened.                      | True     |
| cancelMessage  | string     | An accessible return button when the dialog is opened.                            | True     |
| onSubmit       | function() | Set a submition to be invoked when the specified button of the dialog is pressed. | True     |

<!--  AlertDialogProps-Types -->

### Types

`TRule` : refer to <a href='../../../node/field-validator/README.md'>**this guide**</a>.

<!-- AlertDialog-Screenshots -->

#### :camera: Screenshots

<div  align="center">

<img src="../../../../readme-assets/AlertDialog.gif" alt="screenshot" />

</div>

<!--  Getting Started -->

## :hammer_and_wrench: Getting Started

To add a package to an app, please follow <a href='../../../readme-assets/add-package.md'>**this guide**</a>.

<!--  Running project Tests -->

## :microscope: Running project Tests

To run tests, run the following command

```bash
yarn workspace core-ui test -watch
```
