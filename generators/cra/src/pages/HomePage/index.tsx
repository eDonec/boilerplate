import { useLogout } from "authenticator";
import ButtonLink from "core-cra-components/ButtonLink";
import { Button } from "core-ui";

import { useInitRoute } from "containers/AppRouter/useInitRoute";

const HomePage = () => {
  const logout = useLogout();

  useInitRoute({
    title: "Home",
    description: "Overview of your store",
    customButton: (
      <ButtonLink to="edit" soft primary>
        Create
      </ButtonLink>
    ),
  });

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center dark:text-gray-200">
      <Button primary onClick={logout}>
        logout
      </Button>
    </div>
  );
};

export default HomePage;
