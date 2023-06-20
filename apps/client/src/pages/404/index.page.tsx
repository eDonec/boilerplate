import { useTranslation } from "react-i18next";

import { ButtonLink, SEO } from "core-next-components";
import { clsx } from "core-utils";

import Layout from "components/Layout";

export default function NotFoundPage() {
  const [t] = useTranslation();

  return (
    <Layout>
      <SEO
        title="Not Found"
        description="Désolé, la page que vous cherchez est introuvable. Revenez à notre page d'accueil pour trouver ce que vous cherchez."
        image={`${process.env.NEXT_PUBLIC_HOSTNAME}/og-image/api/main`}
      />

      <main>
        <section className="relative w-full">
          <Layout className="layout flex min-h-[calc(100vh-88px)] flex-col items-center justify-center text-center ">
            <h1
              className={clsx(
                "-z-10 whitespace-pre-line bg-clip-text text-center text-4xl font-extrabold leading-none text-transparent md:text-5xl",
                "bg-gradient-to-r from-[#fc6471] via-[#4d5382] to-[#006989]"
              )}
            >
              <span className="text-7xl md:text-9xl">
                {t("notFound.error404")}
              </span>
              {t("notFound.msg")}
            </h1>
            <ButtonLink className="mt-4 md:text-lg" href="/">
              {t("notFound.bouttonBackToHome")}
            </ButtonLink>
          </Layout>
        </section>
      </main>
    </Layout>
  );
}
