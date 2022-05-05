# Forms

## Table of content

- [Forms](#forms)
  - [Table of content](#table-of-content)
  - [The logic behind](#the-logic-behind)
  - [List of available form inputs](#list-of-available-form-inputs)
  - [Installation](#installation)

## The logic behind

Each form MUST input exports at least two components:

- `RawForm` component: It contains the component that **CAN** be used outside of anyform with all the control functions exposed (such as `onChange` `value` etc...)
- `Form` component: It contains the component that **MUST** be used inside of any form with all the control implicitly handled
- `Form` components **MUST** be wrapped in a `FormContext` component
- `Form` components **MUST** be used with the library `react-hook-form`
- `Form` components **MUST** be contain at least a `name` and a `validate` attribute

## List of available form inputs

- [Input](Input/README.md)
- [Select](Select/README.md)
- [FilePicker](FilePicker/README.md)
- [Checkbox](Checkbox/README.md)
- [RadioButton](RadioButton/README.md)

## Installation

All the above components are available as one internal package.

To add a package to an app, please refer to <a href='../../../readme-assets/add-package.md'>**this guide**</a>.
