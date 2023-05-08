# MediaFormContext

Wrapper around [`react-hook-form/FormProvider`](https://react-hook-form.com/api/formprovider/)
to use as a drop-in replacement if the form contains at least a [`FilePicker`](packages/browser/forms/FilePicker/README.md)
component.

## Import

```ts
import MediaFormContext from "forms/MediaFormContext";
```

## Example

```ts
import { useForm } from "react-hook-form";

import Api from "api";
import { Button } from "core-ui";
import FilePicker from "forms/FilePicker";
import MediaFormContext from "forms/MediaFormContext";

const fetchUploadToken = () =>
  Api.authSDK.getUploadToken({
    query: { mimeTypes: ["image/jpg", "image/jpeg", "image/png"] },
  });

const MyForm = () => {
  const methods = useForm();
  ...

  return (
    <MediaFormContext
      {...methods}
      fetchTokenFunction={fetchUploadToken}
      onSubmit={handleSubmit}
    >
      <FilePicker
        name="avatar"
        label="Avatar"
        accept={{ "image/png": [".jpeg", ".jpg", ".png"] }}
      />
      <Button type="submit" light>
        Submit
      </Button>
    </MediaFormContext>
  );
};

export default MyForm;
```

### Props

> This components extends `react-hook-form/FormProvider` so it also extends
> [`FormProviderProps`](https://github.com/react-hook-form/react-hook-form/blob/master/src/types/form.ts#LL833C31-L839C31)

| Field               | Type                        | Default      | Required | Description                                                                                                                                       |
| ------------------- | --------------------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| fetchTokenFunction  | `() => Promise<string>`     | -            | Yes      | Function that returns a promise that resolves with a token accepted by the `bucket` service. Usually this is going to be `authSDK.getUploadToken` |
| onSubmit            | `SubmitHandler`             | -            | Yes      | Function executed on form submission. This is internally wrapped with `formMethods.handleSubmit`.                                                 |
| onFetchTokenFailure | `(error: Error) => unknown` | -            | No       | Function executed if `fetchTokenFunction` fails.                                                                                                  |
| className           | `string`                    | Empty string | No       | `className` for the wrapping `form` tag                                                                                                           |
