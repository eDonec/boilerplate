# OTPGenerator

The `OTPGenerator` function generates a one-time password (OTP) of a specified length. By default, the length of the OTP is 6 characters.

## Table of contents

- [OTPGenerator](#otpgenerator)
  - [Table of contents](#table-of-contents)
  - [Parameters](#parameters)
  - [Returns](#returns)

## Parameters

- `length`: Optional. An integer that specifies the length of the generated OTP. The default value is 6.
- `options`: Optional. An object that specifies which characters can be included in the generated OTP. The object has the following properties:
  - `digits`: A boolean value that specifies whether to include digits (0-9) in the generated OTP. The default value is `true`.
  - `lowerCaseAlphabets`: A boolean value that specifies whether to include lowercase alphabets (a-z) in the generated OTP. The default value is `false`.
  - `upperCaseAlphabets`: A boolean value that specifies whether to include uppercase alphabets (A-Z) in the generated OTP. The default value is `false`.
  - `specialChars`: A boolean value that specifies whether to include special characters (!@#$%^&\*) in the generated OTP. The default value is `false`.
  - `characterExtensions`: A string that specifies additional characters to be included in the generated OTP. The default value is an empty string.

## Returns

A string containing the generated OTP.
