<!-- Form Inputs -->

# Form Inputs

<!-- Select -->

## Select

<!-- Globals -->

### Globals

`ISelectOption <T = string>` :

| Name  | Type   | Description         | Required |
| ----- | ------ | ------------------- | -------- |
| value | T      | The selected value. | True     |
| label | string | The select label.   | True     |

<!-- RawSelect -->

### RawSelect

<!-- RawSelect-Import -->

#### Import

```typescript
import Select from "forms/Select/RawSelect";
```

<!-- RawSelect-Usage -->

#### Example Usage

```typescript
import { useState } from "react";

import Select from "forms/Select/RawSelect";

import { ISelectOption } from "./types";

const options: ISelectOption<string>[] = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
];

const LanguageSelector = () => {
  const [country, setCountry] = useState<ISelectOption<string>>(options[0]);

  return (
    <Select
      options={options}
      label="Standard"
      onChange={setCountry}
      value={country}
    />
  );
};

export default LanguageSelector;
```

<!-- RawSelect-API -->

#### API

<!-- RawSelect-Props -->

##### Props

| Name         | Type                           | Description                                   | Required |
| ------------ | ------------------------------ | --------------------------------------------- | -------- |
| options      | ISelectOption[]                | Specify the options the user can select from. | True     |
| value        | string                         | The selected value.                           | True     |
| onChange     | function(value: ISelectOption) | Called when input value change.               | True     |
| initialValue | ISelectOption                  | This is the initial selected value            | False    |
| label        | string                         | The select label.                             | False    |
| error        | string                         | Shows an error message if truthy              | False    |
| placeholder  | string                         | Visible string when no value is selected      | False    |
| className    | string                         | Additional classnames                         | False    |

<!-- Select -->

### Select

<!-- Select-import -->

#### Import

```typescript
import Select from "forms/Select";
```

<!--  Select-Usage -->

#### Example Usage

```typescript
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "core-ui";
import Select, { ISelectOption } from "forms/Select";

const HomePage = () => {
  const methods = useForm({
    defaultValues: { selection: undefined },
  });
  const onSubmit: SubmitHandler<{ selection?: ISelectOption<string> }> = (
    value
  ) => console.log(value);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Select
          placeholder="Select placeholder"
          label="Select Label"
          validate={[{ rule: "exists" }]}
          name="selection"
          options={[
            { label: "English", value: "en" },
            { label: "Français", value: "fr" },
          ]}
        />
        <Button type="submit" light>
          submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default HomePage;
```

<!--  Select-API -->

#### API

<!--  Select-Props -->

##### Props

| Name         | Type            | Description                                   | Required |
| ------------ | --------------- | --------------------------------------------- | -------- |
| options      | ISelectOption[] | Specify the options the user can select from. | True     |
| label        | string          | The select label.                             | False    |
| placeholder  | string          | Visible string when no value is selected      | False    |
| initialValue | ISelectOption   | This is the initial selected value            | False    |
| label        | string          | The select label.                             | False    |
| className    | string          | Additional classnames                         | False    |
| name         | string          | Form field name                               | True     |
| validate     | TRule[]         | validates the conditions                      | False    |

<!--  SelectProps-Types -->

### Types

`TRule` : refer to <a href='../field-validator/README.md'>**this guide**</a>.

<!-- Screenshots -->

#### :camera: Screenshots

<div  align="center">

<img  src="../../readme-assets/select.gif"  alt="screenshot" />

</div>

## :hammer_and_wrench: Getting Started

To add a package to an app, please follow <a href='../../readme-assets/add-package.md'>**this guide**</a>.

<!--  Running project Tests -->

## :microscope: Running project Tests

To run tests, run the following command

```bash
yarn workspace forms test -watch
```

<!-- Getting Started -->
