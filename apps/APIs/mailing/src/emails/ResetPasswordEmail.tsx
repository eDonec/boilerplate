// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from "react";

import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";

type ResetPasswordEmailProps = {
  link: string;
  email: string;
  firstName?: string;
  browser?: string | null;
  os?: string | null;
  country?: string | null;
  lastName?: string;
};

function ResetPasswordEmail({
  link = "google.com",
  email,
  firstName,
  country,
  browser,
  os,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Tailwind>
        <Body
          style={{
            fontFamily: "Alexandria",
          }}
        >
          <Container className="flex flex-col px-8 pb-16 pt-10 text-gray-800">
            <Text className="text-xl font-bold">
              <Link className="text-gray-700" href="https://www.edonec.com/">
                Boilerplate
              </Link>
            </Text>
            <Hr />
            <Text className="text-lg font-bold">
              Bonjour {firstName || "Nader"},
            </Text>
            <Text className="text-lg">
              Nous avons reçu une demande de réinitialisation du mot de passe
              pour votre compte{" "}
              <Link
                className="text-blue-600 underline"
                href="https://www.edonec.com/"
              >
                Boilerplate
              </Link>{" "}
              associé à <b>{email || "nader2560@gmail.com"}</b>.
            </Text>
            <Text className="text-lg">
              Aucun changement n'a encore été effectué sur votre compte.
            </Text>
            <Text className="text-lg">
              Vous pouvez utiliser le bouton ci-dessous pour le réinitialiser.
              Ce bouton de réinitialisation de mot de passe n'est{" "}
              <b>valable que pour les prochaines 24 heures.</b>
            </Text>
            <Row>
              <Column className="flex justify-center">
                <Link
                  href={link}
                  className="mx-auto mb-8 mt-16 rounded-md bg-blue-900 px-7 py-3 text-center text-white"
                >
                  Réinitialiser votre mot de passe
                </Link>
              </Column>
            </Row>
            <Text>
              Pour des raisons de sécurité, cette demande nous a été envoyée
              selons ces details:
            </Text>
            <Hr />
            <Section>
              <Text className="text-lg">
                <b>Quand:</b> {format(new Date(), "PPPPp", { locale: fr })}
              </Text>
              <Text className="text-lg">
                <b>Où:</b> {country || "Inconnu"}
              </Text>
              <Text className="text-lg">
                <b>Appareil:</b> Systeme d'exploitation <b>{os}</b>, Navigateur{" "}
                <b>{browser}</b>
              </Text>
            </Section>
            <Hr />
            <Text className="mb-8 font-semibold">
              Si vous n'avez pas effectué cette demande, veuillez ignorer cet
              e-mail.
            </Text>
            <Text>
              Veuillez noter que votre mot de passe ne changera pas tant que
              vous n'aurez pas cliqué sur le lien ci-dessus et créé un nouveau
              mot de passe. Si votre lien a expiré, vous pouvez toujours en
              demander un autre.
            </Text>
            <Text>
              Si vous avez demandé plusieurs e-mails de réinitialisation,
              veuillez vous assurer de cliquer sur le lien dans le courriel le
              plus récent.
            </Text>
            <Hr />
            <Section className="py-8 text-center text-sm">
              <Row className="mx-auto max-w-md">
                <Column>
                  <Text>
                    <Link href="https://www.edonec.com/">Site web</Link>
                  </Text>
                </Column>
                <Column>
                  <Text>
                    <Link href="https://www.edonec.com/privacy-policy/">
                      Politique de confidentialité
                    </Link>
                  </Text>
                </Column>
              </Row>
              <Text className="py-4">
                Veuillez nous contacter si vous avez des questions. (Si vous
                répondez à cet e-mail, nous ne pourrons pas le voir.)
              </Text>
              <Text>
                © {new Date().getFullYear()} Boilerplate | All Rights Reserved.
              </Text>
              <Text>Boilerplate | Address.</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ResetPasswordEmail;
