import AuthSDK from "auth-sdk";
import { ButtonLink, SEO, UnstyledLink } from "core-next-components";
import Button from "core-ui/Button";
import ApiSDK from "server-sdk";

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const api = new ApiSDK();
const authSDK = new AuthSDK(api);

export default function HomePage() {
  return (
    <>
      <SEO />
      <main>
        <section className=" bg-primary-50 ">
          <div
            className="
          layout flex min-h-screen flex-col items-center justify-center bg-white text-center"
          >
            <Button info type="button" onClick={() => authSDK.logout()}>
              logout
            </Button>
            <ButtonLink className="mt-6" href="/components" light>
              See all components
            </ButtonLink>
            <footer className="absolute bottom-2 text-gray-700">
              © {new Date().getFullYear()} By{" "}
              <UnstyledLink href="https://edonec.com">eDonec</UnstyledLink>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
