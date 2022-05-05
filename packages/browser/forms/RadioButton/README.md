# RadioButton

<!-- RawRadioButton -->

## Table of content

- [RadioButton](#radiobutton)
  - [Table of content](#table-of-content)
  - [RawRadioButton](#rawradiobutton)
    - [Import](#import)
    - [Example Usage](#example-usage)
      - [Props](#props)
  - [type IRadioButton](#type-iradiobutton)
  - [RadioButton](#radiobutton-1)
    - [Import](#import-1)
    - [Example Usage](#example-usage-1)
      - [Props](#props-1)
  - [Types](#types)

## RawRadioButton

<!-- RawSelect-Import -->

### Import

```typescript
import Select from "forms/RadioButton/RawRadioButton";
```

### Example Usage

```typescript
export interface RadioButtonProps extends RawRadioButtonProps {
  validate?: TRule[];
}

const RadioButton: React.FC<RadioButtonProps> = ({ validate, ...props }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  const error = get(errors, props.name) as FieldError | undefined;

  return (
    <RawRadioButton
      {...register(props.name, {
        validate: validateForm(props.name, validate || []),
      })}
      {...props}
      error={error?.message}
    />
  );
};
```

#### Props

| Name   | Type           | Description                      | Required |
| ------ | -------------- | -------------------------------- | -------- |
| name   | string         | Form field name                  | True     |
| values | IRadioButton[] | The list of the radio's value    | True     |
| error  | string         | Shows an error message if truthy | False    |

## type IRadioButton

| Name  | Type   | Required |
| ----- | ------ | -------- |
| label | string | True     |
| value | string | True     |

## RadioButton

<!-- RadioButton-import -->

### Import

```typescript
import RadioButton from "forms/RadioButton";
```

<!--  RadioButton-Usage -->

### Example Usage

```typescript
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "core-ui";
import RadioButton from "forms/RadioButton";

const HomePage = () => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <RadioButton
          name="radio"
          values={[
            { value: "f", label: "Female" },
            { value: "m", label: "Male" },
          ]}
          className="bg-radio"
        ></RadioButton>
        <Button type="submit" light>
          submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default HomePage;
```

<!--  Select-Props -->

#### Props

| Name      | Type           | Description                   | Required |
| --------- | -------------- | ----------------------------- | -------- |
| name      | string         | Form field name               | True     |
| values    | IRadioButton[] | The list of the radio's value | True     |
| className | string         | Additional classnames         | False    |

## Types

`TRule` : refer to <a href='../../field-validator/README.md'>**this guide**</a>.
