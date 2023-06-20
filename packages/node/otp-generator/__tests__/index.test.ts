import OTPGenerator from "../index";

describe("OTPGenerator", () => {
  it("should generate a 6-character OTP by default", () => {
    const otp = OTPGenerator();

    expect(otp).toHaveLength(6);
  });

  it("should generate an OTP with the specified length", () => {
    const otp = OTPGenerator(10);

    expect(otp).toHaveLength(10);
  });

  it("should generate an OTP with only digits", () => {
    const otp = OTPGenerator(6, { digits: true });

    expect(otp).toMatch(/^\d+$/);
  });

  it("should generate an OTP with only digits and lowercase alphabets", () => {
    const otp = OTPGenerator(6, { lowerCaseAlphabets: true });

    expect(otp).toMatch(/^[a-z,\d]+$/);
  });

  it("should generate an OTP with only digits and uppercase alphabets", () => {
    const otp = OTPGenerator(6, { upperCaseAlphabets: true });

    expect(otp).toMatch(/^[A-Z,\d]+$/);
  });

  it("should generate an OTP with only digits and special characters", () => {
    const otp = OTPGenerator(6, { specialChars: true });

    expect(otp).toMatch(/^[!@#$%^&*\d]+$/);
  });
  it("should generate an OTP with a combination of allowed characters", () => {
    const otp = OTPGenerator(10, {
      digits: true,
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      specialChars: true,
      characterExtensions: "!@#$%^&*",
    });

    expect(otp).toMatch(/^[\da-zA-Z!@#$%^&*]{10}$/);
  });

  it("should generate a random OTP each time it is called", () => {
    const otp1 = OTPGenerator();
    const otp2 = OTPGenerator();

    expect(otp1).not.toEqual(otp2);
  });
});
