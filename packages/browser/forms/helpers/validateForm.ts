import FieldValidator from "field-validator/FieldValidator";
import { TRule } from "field-validator/types";

export const validateForm =
  (name: string, rules: TRule[], displayName?: string) => (value: string) => {
    const valueValidation = new FieldValidator(value, name, displayName);

    rules.forEach((element) => {
      valueValidation[element.rule](element.param as never);
    });

    return valueValidation.error?.fields[0].message;
  };
