import { AuthGuarded, useAuthStatus, useLogout } from "authenticator";
import { ButtonLink, SEO, UnstyledLink } from "core-next-components";
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";
import Button from "core-ui/Button";

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const logout = useLogout();
  const { isLoggedIn, isLoading } = useAuthStatus();
  const [modalProps, onLogout] = useAlertDialog(() => {
    if (isLoading) return;
    logout();
  });
  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      <SEO />
      <main>
        <section className=" bg-primary-50 ">
          <div
            className="
          layout flex min-h-screen flex-col items-center justify-center bg-white text-center"
          >
            {isLoggedIn ? (
              <Button info type="button" onClick={handleLogout}>
                logout
              </Button>
            ) : (
              <AuthGuarded>
                <div className="mr-2 inline-block rounded border border-primary-400 px-4 py-3 text-xs font-semibold leading-none text-primary-600 hover:border-primary-700 hover:text-primary-700">
                  Se connecter
                </div>
              </AuthGuarded>
            )}
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
      <AlertDialog
        title="Logout"
        confirmMessage="Confirmer"
        cancelMessage="Annuler"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        size="small"
        {...modalProps}
      />
    </>
  );
}
