## CheckBox

<!-- RawCheckBox -->

### RawCheckbox

<!-- RawSelect-Import -->

#### Import

```typescript
import Select from "forms/Checkbox/RawCheckbox";
```

#### Example Usage

```typescript
export interface CheckboxProps extends RawCheckboxProps {
  validate?: TRule[];
}

const Checkbox: React.FC<CheckboxProps> = ({ validate, ...props }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  const error = get(errors, props.name) as FieldError | undefined;

  return (
    <RawCheckbox
      {...register(props.name, {
        validate: validateForm(props.name, validate || []),
      })}
      {...props}
      error={error?.message}
    />
  );
};
```

##### Props

| Name     | Type    | Description                                  | Required |
| -------- | ------- | -------------------------------------------- | -------- |
| name     | string  | Form field name                              | True     |
| label    | string  | the checkbox label.                          | False    |
| error    | string  | Shows an error message if truthy             | False    |
| disabled | boolean | defines that the checkbox is disabled or not | False    |

### CheckBox

<!-- checkbox-import -->

#### Import

```typescript
import Checkbox from "forms/Checkbox";
```

<!--  checkbox-Usage -->

#### Example Usage

```typescript
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "core-ui";
import Checkbox from "forms/CheckBox";

const HomePage = () => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Checkbox
          name="check"
          className="bg-dak"
          label="check box for test"
          defaultChecked
        ></Checkbox>
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

##### Props

| Name           | Type    | Description                                                                     | Required |
| -------------- | ------- | ------------------------------------------------------------------------------- | -------- |
| defaultChecked | boolean | returns true if the checkbox is checked by default, otherwise it returns false. | False    |
| label          | string  | The select label.                                                               | True     |
| className      | string  | Additional classnames                                                           | False    |
| name           | string  | Form field name                                                                 | True     |
| validate       | TRule[] | validates the conditions                                                        | False    |

### Types

`TRule` : refer to <a href='../field-validator/README.md'>**this guide**</a>.
