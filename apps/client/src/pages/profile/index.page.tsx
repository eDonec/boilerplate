import { useAuthClient, useLogout } from "authenticator";
import { ButtonLink, NextImage, SEO } from "core-next-components";
import { Button } from "core-ui";
import { clsx, getImageUrl } from "core-utils";
import { AUTH_PROVIDERS } from "shared-types";

import BlendedText from "components/BlendedText";
import GlassmorphicCard from "components/GlassmorphicCard";
import LabelValueDisplay from "components/LabelValueDisplay";
import PrivateContainer from "containers/PrivateContainer";

function ProfilePage() {
  const authClient = useAuthClient();
  const logout = useLogout();

  if (!authClient) return <PrivateContainer />;

  const shouldShowEditPassword = authClient.authProvider.includes(
    AUTH_PROVIDERS.CLASSIC
  );

  return (
    <PrivateContainer>
      <div className="container mx-auto space-y-4 px-4 pb-10 md:px-0">
        <SEO
          title="Profile | Mr le Psy"
          description="Consultez votre profil sur notre page dédiée pour voir toutes vos informations personnelles en un seul endroit. Assurez-vous que toutes vos informations sont à jour et exactes. Nous prenons votre vie privée très au sérieux et nous nous engageons à garantir la confidentialité et la sécurité de vos données."
          image={`${process.env.NEXT_PUBLIC_HOSTNAME}/og-image/api/main`}
        />
        <BlendedText className="mt-3 text-6xl md:text-9xl" text="Profil" />
        <GlassmorphicCard className="grid gap-3 p-5 md:grid-cols-6">
          {authClient.user.avatar && (
            <NextImage
              src={authClient.user.avatar.url}
              loader={({ src, width }) => getImageUrl(src, width, width)}
              imgClassName="rounded-full object-cover"
              className="relative mx-auto aspect-square w-2/5 md:w-full"
              fill
              alt="avatar"
            />
          )}
          <div
            className={clsx("col-span-full flex flex-col space-y-2", {
              "col-start-2": authClient.user.avatar,
            })}
          >
            <h3 className="mb-5 text-3xl font-bold">
              Informations personnelles
            </h3>
            <LabelValueDisplay label="Email" value={authClient.email} />
            <LabelValueDisplay
              label="Nom d'utilisateur"
              value={authClient.userName}
            />
            <LabelValueDisplay label="Nom" value={authClient.user.lastName} />
            <LabelValueDisplay
              label="Prénom"
              value={authClient.user.firstName}
            />
            <LabelValueDisplay
              label="N° Téléphone"
              value={authClient.user.phoneNumber}
            />
            <ButtonLink
              href="/profile/edit"
              className="!block text-center text-sm md:self-end"
            >
              Modifier les informations personelles
            </ButtonLink>
            {shouldShowEditPassword && (
              <ButtonLink
                href="/profile/edit-password"
                className="!block text-center text-sm md:self-end"
              >
                Modifier le mot de passe
              </ButtonLink>
            )}
            <Button
              onClick={logout}
              danger
              soft
              type="button"
              className="!block text-sm md:self-end"
            >
              Se déconnecter
            </Button>
          </div>
        </GlassmorphicCard>
      </div>
    </PrivateContainer>
  );
}

export default ProfilePage;
