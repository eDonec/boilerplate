/* eslint-disable max-lines */
import { isAfter } from "date-fns";
import isBefore from "date-fns/isBefore";
import isValid from "date-fns/isValid";

// TODO: Update multilanguage support somehow
import {
  alphaNumRegex,
  alphaRegex,
  alphaSpaceRegex,
  emailRegex,
  kebabCaseRegex,
  objectIdHexRegexp,
  urlRegex,
} from "./regex";
import { Primitives } from "./validationTypes";

export default class FieldValidator {
  private fieldToTest?: Primitives;

  private fieldName: string;

  private displayName: string;

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
    fieldToTest: Primitives,
    fieldName: string,
    displayName?: string
  ) {
    this.fieldToTest = fieldToTest;
    this.fieldName = fieldName;
    this.displayName = displayName ?? fieldName;
  }

  private isStringType(field: Primitives = this.fieldToTest): field is string {
    if (field == null) return false;
    if (typeof field === "string") return true;

    this.error = {
      message: "Validation error!",
      fields: [
        ...(this.error?.fields || []),
        {
          fieldName: this.fieldName,
          message: `${this.displayName} n'est pas une chaîne de caractères valide`,
        },
      ],
    };

    return false;
  }

  private isDateType(field: Primitives = this.fieldToTest): field is Date {
    if (field == null || typeof field === "boolean") return false;
    if (field instanceof Date) return true;
    try {
      this.fieldToTest = new Date(field);

      return true;
    } catch (error) {
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.displayName} n'est pas une date valide`,
          },
        ],
      };

      return false;
    }
  }

  private isNumberType(field: Primitives = this.fieldToTest): field is number {
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
          message: `${this.displayName} n'est pas un nombre`,
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
            message: `${this.displayName} doit être une adresse email valide`,
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
            message: `${this.displayName} n'existe pas`,
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
            message: `${this.displayName} est obligatoire`,
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
            message: `${this.displayName} doit être une chaine de caractères`,
          },
        ],
      };

    return this;
  }

  isBoolean() {
    if (typeof this.fieldToTest !== "boolean")
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.displayName} doit être un booléen`,
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
            message: `${
              this.fieldName
            } doit être l'un des valeurs [${paramArray.join(", ")}]`,
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
            message: `${this.displayName} ne peut contenir que des lettres`,
          },
        ],
      };

    return this;
  }

  isKebabCase() {
    if (!this.isStringType(this.fieldToTest)) return this;

    if (!kebabCaseRegex.test(this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.displayName} ne doit contenir que des lettres minuscules, des chiffres et des tirets`,
          },
        ],
      };

    return this;
  }

  isValidObjectId() {
    if (!this.isStringType(this.fieldToTest)) return this;

    if (!objectIdHexRegexp.test(this.fieldToTest))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.displayName} is not a valid ObjectId`,
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
            message: `${this.displayName} ne doit contenir que des lettres et des espaces`,
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
            message: `${this.displayName} ne doit contenir que des lettres et des chiffres`,
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
            message: `${this.displayName} ne doit pas depassé ${length} caractères`,
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
            message: `${this.displayName} doit avoir au moins ${length} caractères`,
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
            message: `${this.displayName} doit être identique au mot de passe`,
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
            message: `${this.displayName} doit être une url valide`,
          },
        ],
      };

    return this;
  }

  //date
  isDate() {
    if (!(this.isDateType(this.fieldToTest) && isValid(this.fieldToTest)))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.displayName} doit être une date valide`,
          },
        ],
      };

    return this;
  }

  isBeforDate(maxDate: Date) {
    if (!this.isDateType(this.fieldToTest)) return this;
    if (isAfter(this.fieldToTest, maxDate))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.displayName} doit être avant ${maxDate}`,
          },
        ],
      };

    return this;
  }

  isAfterDate(minDate: Date) {
    if (!this.isDateType(this.fieldToTest)) return this;

    if (isBefore(this.fieldToTest, minDate))
      this.error = {
        message: "Validation error!",
        fields: [
          ...(this.error?.fields || []),
          {
            fieldName: this.fieldName,
            message: `${this.displayName} doit être apres ${minDate} `,
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
            message: `${this.displayName} doit être un nombre valide`,
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
            message: `${this.displayName}  doit être inférieur à ${max}`,
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
            message: `${this.displayName} doit être superieur à ${min}`,
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
            message: `${this.displayName} doit être entre ${min} et ${max} `,
          },
        ],
      };
    }

    return this;
  }
}
