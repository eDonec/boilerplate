import FacebookLogin from "@greatsumini/react-facebook-login";

import { FACEBOOK_APP_ID } from "../../ThirdPartyIds";

interface IProps {
  onSuccess: (accessToken: string) => void;
  onFail: (errorReason: string) => void;
  text: string;
}

// TODO: Check for inner failed requests that are getting blocked by uBlockOrigin and adBlockers this may cause problem further down the line
const FacebookButton: React.FC<IProps> = ({ onSuccess, onFail, text }) => (
  <div className="mx-auto my-3">
    <FacebookLogin
      className=""
      appId={FACEBOOK_APP_ID}
      onSuccess={(res) => onSuccess(res.accessToken)}
      onFail={(res) => onFail(res.status)}
    >
      <div
        data-testid="facebook-login"
        className="relative flex min-h-[38px]  w-full transform flex-nowrap items-center justify-between rounded bg-white fill-[#1877F2] px-3 text-left text-sm text-gray-800 transition-colors duration-75 hover:bg-gray-600 hover:fill-white hover:text-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600"
      >
        <div className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 16 16"
          >
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
          </svg>
        </div>
        <span className="flex-grow text-center text-xs font-semibold md:text-sm ">
          {text}
        </span>
      </div>
    </FacebookLogin>
  </div>
);

export default FacebookButton;
