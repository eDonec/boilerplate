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

  isStringType(field?: string | number | Date): field is string {
    if (typeof field === "string") return true;

    this.error = {
      message: "Validation error!",
      fields: [
        {
          fieldName: this.fieldName,
          message: `${this.fieldName} is not a string`,
        },
      ],
    };

    return false;
  }

  isDateType(field?: string | number | Date): field is Date {
    if (field instanceof Date) return true;
    this.error = {
      message: "Validation error!",
      fields: [
        {
          fieldName: this.fieldName,
          message: `${this.fieldName} is not a Date`,
        },
      ],
    };

    return false;
  }

  isNumberType(field?: string | number | Date): field is number {
    if (typeof field === "number") return true;
    this.error = {
      message: "Validation error!",
      fields: [
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
          {
            fieldName: this.fieldName,
            message: `${this.fieldName}  must be at least ${length}`,
          },
        ],
      };

    return this;
  }

  isPasswordMatch(val: string) {
    if (!this.isStringType(this.fieldToTest)) return this;
    if (this.fieldToTest !== val)
      this.error = {
        message: "Validation error!",
        fields: [
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
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} must at least be ${min}`,
          },
        ],
      };

    return this;
  }

  isBetween(num1: number, num2: number) {
    if (!this.isNumberType(this.fieldToTest)) return this;
    if (!(this.fieldToTest < num1 && this.fieldToTest > num2)) {
      this.error = {
        message: "Validation error!",
        fields: [
          {
            fieldName: this.fieldName,
            message: `${this.fieldName} should be between ${num1} and ${num2} `,
          },
        ],
      };
    }

    return this;
  }
}
