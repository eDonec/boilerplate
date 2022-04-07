# Field Validator

&nbsp;

### Validation Methods:

- Letter
- Numeric
- Alpha
- Date
- Url
- Email
- Confirm password

&nbsp;

### Letter

| Rules        | Params          | Type   | Description                                                  |
| ------------ | --------------- | ------ | ------------------------------------------------------------ |
| isString     |                 | String | it will check letter valdation                               |
| isEmpty      |                 | String | it will check if if a string is empty                        |
| minLenght    | length : number | String | it will check minimum length of the letter.                  |
| maxLenght    | length : number | String | it will check maximum length of the letter.                  |
| isAlpha      |                 | String | it will check if the value contains only letters             |
| isAlphaSpace |                 | String | it will check if the value contains only letters and spaces  |
| isAlphaNum   |                 | String | it will check if the value contains only letters and numbers |

&nbsp;

### Numeric

| Rules              | Params                      | Type   | Description                                     |
| ------------------ | --------------------------- | ------ | ----------------------------------------------- |
| isNumber           |                             | Number | it will check number type                       |
| isBiggerThanNumber | max                         | Number | it will check if the number is greater than max |
| isLessThanNumber   | min                         | Number | it will check if the number is less than min    |
| isBetween          | {min: number , max: number} | Number | it will check if the number between two values  |

&nbsp;

### Date

| Rules       | Params | Type | Description                                      |
| ----------- | ------ | ---- | ------------------------------------------------ |
| isDate      | date   | Date | it will check date type                          |
| isAfterDate | date   | Date | it will check if the date after a specific date  |
| isBeforDate | date   | Date | it will check if the date before a specific date |

&nbsp;

### URL

| Rules | Params | Type   | Description                                               |
| ----- | ------ | ------ | --------------------------------------------------------- |
| isUrl |        | String | it will check if the url is a valid url and match a regex |

&nbsp;

### Email

| Rules   | Params | Type   | Description                                         |
| ------- | ------ | ------ | --------------------------------------------------- |
| isEmail |        | String | it will check if the email is a valid email address |

&nbsp;

### Confirm password

| Rules           | Params   | Type   | Description                                                                     |
| --------------- | -------- | ------ | ------------------------------------------------------------------------------- |
| isPasswordMatch | password | String | it will check that the password entered is same as this confirm password fields |

### Exsists

| Rules  | Params | Type | Description                          |
| ------ | ------ | ---- | ------------------------------------ |
| exists |        |      | it will check if if a string is null |
