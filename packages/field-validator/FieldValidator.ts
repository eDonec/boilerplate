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
  urlRegex,
} from "./regex";

export default class FieldValidator {
  private fieldToTest?: string | number | Date;

  private fieldName: string;

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
    if (typeof field === "number") return true;
    if (!Number.isNaN(Number(field))) {
      this.fieldToTest = Number(field);

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

  isAfterDate(date: Date) {
    if (!this.isDateType(this.fieldToTest)) return this;
    if (!isAfter(date, this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be after ${date}`,
          },
        ],
      };

    return this;
  }

  isBeforDate(date: Date) {
    if (!this.isDateType(this.fieldToTest)) return this;

    if (!isBefore(date, this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be before ${date} `,
          },
        ],
      };

    return this;
  }

  isNumber() {
    if (!this.isNumberType(this.fieldToTest)) return this;
    if (Number.isNaN(this.fieldToTest))
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

  isBiggerThanNumber(max: number) {
    if (!this.isNumberType(this.fieldToTest)) return this;
    if (this.fieldToTest > max)
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

  isLessThanNumber(min: number) {
    if (!this.isNumberType(this.fieldToTest)) return this;
    if (this.fieldToTest < min)
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
    if (!(this.fieldToTest > min && this.fieldToTest < max)) {
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
