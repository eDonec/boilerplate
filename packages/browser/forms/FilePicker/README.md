## FilePicker

<!-- RawFilePicker -->

### RawFilePicker

<!-- RawFilePicker-Import -->

#### Import

```typescript
import RawFilePickerfrom "./RawFilePicker";
```

#### Example Usage

```typescript
export interface IProps
  extends Omit<IComponentProps, "error" | "onChange" | "value"> {
  name: string;
  validate?: TRule[];
}
const FilePicker: React.FC<IProps> = ({
  name,
  validate,
  ...filePickerProps
}) => {
  const { control } = useFormContext();

  const { errors } = useFormState();

  const error = get(errors, name) as FieldError | undefined;

  return (
    <Controller
      rules={{ validate: validateForm(name, validate || []) }}
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <RawFilePicker
          name={name}
          {...filePickerProps}
          ref={ref}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    ></Controller>
  );
};
```

##### Props

| Name     | Type                             | Description                                  | Required |
| -------- | -------------------------------- | -------------------------------------------- | -------- |
| name     | string                           | Form field name                              | True     |
| label    | string                           | the form picker label.                       | False    |
| error    | string                           | Shows an error message if truthy             | False    |
| maxFiles | number                           | Maximum accepted number of files             | False    |
| onChange | files: IFileWithPreview) => void | Fired when the files inside dropzone change. | False    |
| accept   | string, string[]                 | Set accepted file types                      | False    |
| value    | string, string[]                 | the value of upload file                     | False    |

### Props: Dropzone

| Name          | Type     | Description                                                               | Required |
| ------------- | -------- | ------------------------------------------------------------------------- | -------- |
| getInputProps | function | Returns the props you should apply to hidden file input you render        | False    |
| getRootProps  | function | tReturns the props you should apply to the root drop container you render | False    |
| isDragActive  | boolean  | Active drag is in progress                                                | False    |
| isDragReject  | number   | Some dragged files are rejected                                           | False    |
| onDrop        | function | Callback for when the drop event occurs.                                  | False    |

### FilePicker

<!-- filePicker-import -->

#### Import

```typescript
import FilePicker from "forms/FilePicker";
```

<!--  filePicker-Usage -->

#### Example Usage

```typescript
import FilePicker from "forms/FilePicker";

const HomePage = () => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FilePicker
          name="image"
          label="Click to select image"
          accept=".jpeg,.jpg,.png,.docx,.pptx,.pdf,.xlsx"
          maxFiles={10}
        ></FilePicker>
        <Button type="submit" light>
          submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default HomePage;
```

##### Props

| Name     | Type   | Description                      | Required |
| -------- | ------ | -------------------------------- | -------- |
| name     | string | Form field name                  | True     |
| label    | string | the form picker label.           | False    |
| maxFiles | number | Maximum accepted number of files | False    |
| accept   | string | Set accepted file types          | False    |

#### Screenshots

<img  src="../../../../readme-assets/file-picker.png"  alt="screenshot" />

</div>

### Delete the uploaded file

#### Example Usage

```typescript
const deleteFile = (index: number) => {
  setFiles((prev) => prev.filter((_file, i) => index !== i));
};
```

```typescript
  <span
    className="absolute top-[-12px] right-[-12px]"
    tabIndex={index}
    role="button"
    onClick={(event) =>
    handlePictureClick(event, index, deleteFile)}
     onKeyDown={(event) => handlePictureClick(event, index, deleteFile)}
  />

};
```
