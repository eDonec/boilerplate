import FieldValidator from "./FieldValidator";
import { Primitives } from "./validationTypes";

export type TFiledValidatorAvailableRulesWithStringParam = keyof Pick<
  FieldValidator,
  "isPasswordMatch"
>;
export type TFiledValidatorAvailableRulesWithDateParam = keyof Pick<
  FieldValidator,
  "isAfterDate" | "isBeforDate"
>;
export type TFiledValidatorAvailableRulesWithNumberParam = keyof Pick<
  FieldValidator,
  "maxLength" | "minLength" | "isBiggerThanNumber" | "isLessThanNumber"
>;

export type TFiledValidatorAvailableRulesWitTowNumberParam = keyof Pick<
  FieldValidator,
  "isBetween"
>;
export type TFiledValidatorAvailableRulesWithNoParam = keyof Omit<
  FieldValidator,
  | "isBetween"
  | "isAfterDate"
  | "isBeforDate"
  | "isBiggerThanNumber"
  | "isLessThanNumber"
  | "maxLength"
  | "minLength"
  | "isPasswordMatch"
  | "error"
  | "oneOfValidatorsIsClean"
  | "multipleValidatorsError"
  | "fieldHasMultipleValidators"
  | "isStringType"
  | "isDateType"
  | "isNumberType"
>;

export type TRule =
  | {
      rule: TFiledValidatorAvailableRulesWithStringParam;
      param: string;
    }
  | {
      rule: TFiledValidatorAvailableRulesWithDateParam;
      param: Date;
    }
  | {
      rule: TFiledValidatorAvailableRulesWithNumberParam;
      param: number;
    }
  | {
      rule: TFiledValidatorAvailableRulesWitTowNumberParam;
      param: { min: number; max: number };
    }
  | { rule: TFiledValidatorAvailableRulesWithNoParam; param?: undefined };

export type TValidate<T> = {
  [key in keyof T]: T[key] extends Primitives
    ? FieldValidator
    : TValidate<T[key]>;
};
