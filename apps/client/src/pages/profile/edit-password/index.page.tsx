import { FormProvider } from "react-hook-form";

import { SEO } from "core-next-components";
import { Button } from "core-ui";
import { Input } from "forms";

import BlendedText from "components/BlendedText";
import GlassmorphicCard from "components/GlassmorphicCard";
import PrivateContainer from "containers/PrivateContainer";

import { useEditPasswordPage } from "./useEditPasswordPage";

function EditPasswordPage() {
  const { formMethods, handleSubmit } = useEditPasswordPage();

  return (
    <PrivateContainer>
      <div className="container mx-auto p-4 md:p-0">
        <SEO
          title="Modification du mot de passe | Boilerplate"
          description="Modifiez votre mot de passe en toute sécurité sur notre page de modification de mot de passe. Protégez votre compte en créant un mot de passe fort et complexe. Notre système sécurisé garantit la confidentialité de vos informations personnelles."
          image={`${process.env.NEXT_PUBLIC_HOSTNAME}/og-image/api/main`}
        />
        <BlendedText className="text-9xl" text="Modification du mot de passe" />
        <GlassmorphicCard className="mx-auto max-w-3xl">
          <FormProvider {...formMethods}>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="••••••••"
                name="password"
                type="password"
                label="Ancien mot de passe"
                displayName="L'ancien mot de passe"
                validate={[
                  {
                    rule: "isEmpty",
                  },
                  {
                    rule: "minLength",
                    param: 8,
                  },
                ]}
              />
              <Input
                placeholder="••••••••"
                name="newPassword"
                type="password"
                label="Nouveau mot de passe"
                displayName="Le nouveau mot de passe"
                validate={[
                  {
                    rule: "isEmpty",
                  },
                  {
                    rule: "minLength",
                    param: 8,
                  },
                ]}
              />
              <Input
                placeholder="••••••••"
                name="newPasswordConfirmation"
                type="password"
                validate={[
                  {
                    rule: "isEmpty",
                  },
                  {
                    rule: "minLength",
                    param: 8,
                  },
                  {
                    rule: "isPasswordMatch",
                    param: formMethods.watch("newPassword"),
                  },
                ]}
                label="Confirmation du nouveau mot de passe"
                displayName="La confirmation du nouveau mot de passe"
              />
              <Button light className="mt-4" type="submit">
                Confirmer
              </Button>
            </form>
          </FormProvider>
        </GlassmorphicCard>
      </div>
    </PrivateContainer>
  );
}

export default EditPasswordPage;
