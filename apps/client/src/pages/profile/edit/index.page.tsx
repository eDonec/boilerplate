import { toast } from "react-hot-toast";

import { useAuthStatus, UserDetailsForm } from "authenticator";
import { SEO } from "core-next-components";

import { useRouter } from "next/router";

import BlendedText from "components/BlendedText";
import GlassmorphicCard from "components/GlassmorphicCard";
import PrivateContainer from "containers/PrivateContainer";

function EditProfilePage() {
  const router = useRouter();
  const { isInitiated } = useAuthStatus();

  function handleSubmitSuccess() {
    toast.success("Vos informations ont été modifiées avec succès");
    router.push("/profile");
  }

  return (
    <PrivateContainer>
      <div className="overfow-x-hidden container mx-auto space-y-6 p-4 md:p-0">
        <SEO
          title="Modification du Profil | Mr le Psy"
          description="Mettez à jour votre profil en toute sécurité sur notre page de modification de profil. Ajoutez ou modifiez vos informations personnelles grâce à notre système de sécurité fiable. Votre confidentialité est notre priorité."
          image={`${process.env.NEXT_PUBLIC_HOSTNAME}/og-image/api/main`}
        />
        <BlendedText
          className="mt-4 text-4xl md:text-6xl lg:w-3/5 lg:text-9xl"
          text="Modification du profil"
        />
        {isInitiated && (
          <GlassmorphicCard className="mx-auto max-w-3xl">
            <UserDetailsForm onSuccessfullProfileUpdate={handleSubmitSuccess} />
          </GlassmorphicCard>
        )}
      </div>
    </PrivateContainer>
  );
}

export default EditProfilePage;
