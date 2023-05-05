import { GoogleLogin } from "@react-oauth/google";

interface IProps {
  useOneTapLogin?: boolean;
  onSuccess: (accessToken: string) => void;
  onFail: (reason: string) => void;
  text: "signin_with" | "signup_with" | "continue_with" | "signin";
}

const Google: React.FC<IProps> = ({
  onSuccess,
  useOneTapLogin,
  onFail,
  text,
}) => (
  <div className="mx-auto">
    <GoogleLogin
      onSuccess={({ credential }) =>
        credential ? onSuccess(credential) : onFail("No credential")
      }
      useOneTap={useOneTapLogin}
      text={text}
      logo_alignment="left"
      size="large"
    />
  </div>
);

export default Google;
