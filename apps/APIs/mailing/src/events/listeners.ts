import { render } from "@react-email/render";
import sendgrid from "@sendgrid/mail";
import AuthConsumer from "auth-events/consumer";

import ResetPasswordEmail from "../emails/ResetPasswordEmail";

const authConsumer = new AuthConsumer();

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("Missing .env variable: SENDGRID_API_KEY");
}

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

authConsumer.subscribe.ResetPasswordRequest(
  ({
    resetPasswordToken,
    email,
    firstName,
    lastName,
    country,
    os,
    browser,
  }) => {
    if (!process.env.EMAIL_SENDER) {
      throw new Error("Missing .env variable: EMAIL_SENDER");
    }
    const emailHtml = render(
      ResetPasswordEmail({
        link: `${process.env.HOST_URL}/reset-password?token=${resetPasswordToken}`,
        email,
        firstName,
        lastName,
        country,
        os,
        browser,
      })
    );
    const options: sendgrid.MailDataRequired = {
      to: email,
      from: { email: process.env.EMAIL_SENDER, name: "Mr. le Psy" },
      subject: "Réinitialisation de votre mot de passe",
      html: emailHtml,
    };

    sendgrid.send(options).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
  }
);
