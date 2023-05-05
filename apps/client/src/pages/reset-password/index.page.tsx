import toast from "react-hot-toast";

import { ResetPasswordConfirmForm } from "authenticator";
import SEO from "core-next-components/SEO";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import GlassmorphicCard from "components/GlassmorphicCard";

export const getServerSideProps: GetServerSideProps = async function (context) {
  const { token } = context.query;

  if (typeof token !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

type ResetPasswordPageProps = {
  token: string;
};

function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  const router = useRouter();

  function handleSubmitSuccess() {
    toast.success("Votre mot de passe a été réinitialisé avec succès!");
    router.push("/");
  }

  return (
    <div className="container mx-auto pt-12">
      <SEO
        title="Réinitialiser mon mot de passe | Mr le Psy"
        description="Portail de réinitialisation de mot de passe de Mr le Psy."
        image={`${process.env.NEXT_PUBLIC_HOSTNAME}/og-image/main`}
      />
      <GlassmorphicCard>
        <h1 className="mb-4">Réinitialiser mon mot de passe</h1>
        <ResetPasswordConfirmForm
          onResetPasswordConfirmSuccess={handleSubmitSuccess}
          token={token}
        />
      </GlassmorphicCard>
    </div>
  );
}

export default ResetPasswordPage;
