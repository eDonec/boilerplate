/* eslint-disable max-lines */
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isDate from "date-fns/isDate";
import isValid from "date-fns/isValid";

import {
  alphaNumRegex,
  alphaRegex,
  alphaSpaceRegex,
  emailRegex,
  snakeCaseRegex,
  urlRegex,
} from "./regex";

export default class FieldValidator {
  private fieldToTest?: string | number | Date;

  private fieldName: string;

  fieldHasMultipleValidators = false;

  oneOfValidatorsIsClean = false;

  multipleValidatorsError?: {
    message: string;
    fields: { fieldName: string; message: string }[];
  } = undefined;

  error?: {
    message: string;
    fields: { fieldName: string; message: string }[];
  } = undefined;

  constructor(
    fieldToTest: string | number | Date | undefined,
    fieldName: string
  ) {
    this.fieldToTest = fieldToTest;
    this.fieldName = fieldName;
  }

  private isStringType(
    field: string | number | Date | undefined = this.fieldToTest
  ): field is string {
    if (field == null) return false;
    if (typeof field === "string") return true;

    this.error = {
      message: "Validation error!",
      fields: [
        ...(this.error?.fields || []),
        {
          fieldName: this.fieldName,
          message: `${this.fieldName} is not a string`,
        },
      ],
    };

    return false;
  }

  private isDateType(
    field: string | number | Date | undefined = this.fieldToTest
  ): field is Date {
    if (field == null) return false;
    if (field instanceof Date) return true;
    this.error = {
      message: "Validation error!",
      fields: [
        ...(this.error?.fields || []),
        {
          fieldName: this.fieldName,
          message: `${this.fieldName} is not a Date`,
        },
      ],
    };

    return false;
  }

  private isNumberType(
    field: string | number | Date | undefined = this.fieldToTest
  ): field is number {
    if (field == null) return false;
    if (typeof field === "number") return true;
    if (!Number.isNaN(Number(field))) {
      return true;
    }
    this.error = {
      message: "Validation error!",
      fields: [
        ...(this.error?.fields || []),
        {
          fieldName: this.fieldName,
          message: `${this.fieldName} is not a number`,
        },
      ],
    };

    return false;
  }

  or() {
    this.fieldHasMultipleValidators = true;
    if (this.error) {
      // TODO: Check for reference transfer
      this.multipleValidatorsError = {
        message: "One or more of the validators failed",
        fields: [
          ...(this.multipleValidatorsError?.fields || []),
          this.error.fields[0],
        ],
      };
      this.error = undefined;
    } else {
      this.oneOfValidatorsIsClean = true;
    }

    return this;
  }

  isEmail() {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (!emailRegex.test(this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} must be a valid email address`,
          },
        ],
      };

    return this;
  }

  exists() {
    if (this.fieldToTest == null)
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} not exist`,
          },
        ],
      };

    return this;
  }

  isEmpty() {
    if (this.exists().fieldToTest === "")
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} is empty`,
          },
        ],
      };

    return this;
  }

  isString() {
    if (typeof this.fieldToTest !== "string")
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} must be a string`,
          },
        ],
      };

    return this;
  }

  isInArrayOfStrings(paramArray: string[]) {
    if (!this.isStringType(this.fieldToTest)) return this;

    if (!paramArray.includes(this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} must be a string`,
          },
        ],
      };

    return this;
  }

  isAlpha() {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (!alphaRegex.test(this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} can only contain letters`,
          },
        ],
      };

    return this;
  }

  isSnakeCase() {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (!snakeCaseRegex.test(this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} can only contain letters and dashes (it should be snake case) "-"`,
          },
        ],
      };

    return this;
  }

  isAlphaSpace() {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (!alphaSpaceRegex.test(this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} can only contain letters and spaces`,
          },
        ],
      };

    return this;
  }

  isAlphaNum() {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (!alphaNumRegex.test(this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} can only contain letters and numbers`,
          },
        ],
      };

    return this;
  }

  maxLength(length: number) {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (this.fieldToTest.length > length)
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} must not exceed ${length}`,
          },
        ],
      };

    return this;
  }

  minLength(length: number) {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (this.fieldToTest.length < length)
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName}  must be at least ${length}`,
          },
        ],
      };

    return this;
  }

  isPasswordMatch(password: string) {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (this.fieldToTest !== password)
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be a same password`,
          },
        ],
      };

    return this;
  }

  isUrl() {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (!urlRegex.test(this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be a valid url`,
          },
        ],
      };

    return this;
  }

  //date
  isDate() {
    if (!(isDate(this.fieldToTest) && isValid(this.fieldToTest)))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be a valid date`,
          },
        ],
      };

    return this;
  }

  isBeforDate(maxDate: Date) {
    if (!this.isDateType(this.fieldToTest)) return this;
    if (!isAfter(maxDate, this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be after ${maxDate}`,
          },
        ],
      };

    return this;
  }

  isAfterDate(minDate: Date) {
    if (!this.isDateType(this.fieldToTest)) return this;

    if (!isBefore(minDate, this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be before ${minDate} `,
          },
        ],
      };

    return this;
  }

  isNumber() {
    if (!this.isNumberType(this.fieldToTest)) return this;
    const fieldToTest = Number(this.fieldToTest);

    if (Number.isNaN(fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be a number`,
          },
        ],
      };

    return this;
  }

  isLessThanNumber(max: number) {
    if (!this.isNumberType(this.fieldToTest)) return this;
    const fieldToTest = Number(this.fieldToTest);

    if (fieldToTest > max)
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName}  must not exceed ${max}`,
          },
        ],
      };

    return this;
  }

  isBiggerThanNumber(min: number) {
    if (!this.isNumberType(this.fieldToTest)) return this;
    const fieldToTest = Number(this.fieldToTest);

    if (fieldToTest < min)
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} must at least be ${min}`,
          },
        ],
      };

    return this;
  }

  isBetween({ min, max }: { min: number; max: number }) {
    if (!this.isNumberType(this.fieldToTest)) return this;
    const fieldToTest = Number(this.fieldToTest);

    if (!(fieldToTest > min && fieldToTest < max)) {
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be between ${min} and ${max} `,
          },
        ],
      };
    }

    return this;
  }
}
