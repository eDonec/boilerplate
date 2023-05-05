import { DeepMap, DeepPartial, SubmitHandler } from "react-hook-form";

export const omitUnchangedFormFields =
  <T extends Record<string, unknown>>(
    dirtyFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>,
    onSubmit: SubmitHandler<T>
  ) =>
  (data: T) => {
    const changedFields = Object.keys(dirtyFields) as Array<keyof T>;

    const changedData = changedFields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: data[field],
      }),
      {} as T
    );

    onSubmit(changedData);
  };
