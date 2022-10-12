// !STARTERCONF You can delete this page
import * as React from "react";

import {
  ButtonLink,
  PrimaryLink,
  SEO,
  UnstyledLink,
} from "core-next-components";
import Button from "core-ui/Button";
import { useDarkMode } from "core-ui/DarkModeProvider/useDarkMode";
import clsx from "core-utils/clsx";

import { colorList } from "constants/colorList";

import Layout from "components/Layout";

type Color = typeof colorList[number];

const ComponentsPage = () => {
  const [color, setColor] = React.useState<Color>("sky");
  const { toggleDarkMode } = useDarkMode();

  return (
    <Layout>
      <SEO description="Pre-built components with awesome default" />

      <main>
        <section className={`${color}`}>
          <div
            className={clsx(
              "layout min-h-screen py-20",
              "dark:text-white",
              "text-black"
            )}
          >
            <h1>Built-in Components</h1>
            <ButtonLink outline className="mt-2" href="/">
              Back to Home
            </ButtonLink>

            <div className="mt-8 flex flex-wrap gap-2">
              <Button onClick={toggleDarkMode} light>
                Toggle Dark mode
              </Button>
              <Button isLoading outline gray onClick={toggleDarkMode}>
                Outline
              </Button>
              {/* <Button onClick={randomize}>Randomize CSS Variable</Button> */}
            </div>

            <ol className="mt-8 space-y-6">
              <li className="space-y-2">
                <h2 className="text-lg md:text-xl">Customize Colors</h2>
                <p
                  className={clsx(
                    "!mt-1 text-sm",
                    "text-gray-600 dark:text-gray-200"
                  )}
                >
                  You can change primary color to any Tailwind CSS colors. See
                  globals.css to change your color.
                </p>
                <div className="flex flex-wrap gap-2">
                  <select
                    name="color"
                    id="color"
                    value={color}
                    className={clsx(
                      "block max-w-xs rounded",
                      "dark:bg-dark dark:border dark:border-gray-600 dark:duration-700",
                      "border-gray-300 bg-white",
                      "focus:border-primary-400 focus:ring-primary-400 focus:outline-none focus:ring"
                    )}
                    onChange={(e) => setColor(e.target.value as Color)}
                  >
                    {colorList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  <div className="bg-primary-50 flex h-10 w-10 items-center justify-center rounded text-black">
                    50
                  </div>
                  <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded text-black">
                    100
                  </div>
                  <div className="bg-primary-200 flex h-10 w-10 items-center justify-center rounded text-black">
                    200
                  </div>
                  <div className="bg-primary-300 flex h-10 w-10 items-center justify-center rounded text-black">
                    300
                  </div>
                  <div className="bg-primary-400 flex h-10 w-10 items-center justify-center rounded text-black">
                    400
                  </div>
                  <div className="bg-primary-500 flex h-10 w-10 items-center justify-center rounded text-black">
                    500
                  </div>
                  <div className="bg-primary-600 flex h-10 w-10 items-center justify-center rounded text-white">
                    600
                  </div>
                  <div className="bg-primary-700 flex h-10 w-10 items-center justify-center rounded text-white">
                    700
                  </div>
                  <div className="bg-primary-800 flex h-10 w-10 items-center justify-center rounded text-white">
                    800
                  </div>
                  <div className="bg-primary-900 flex h-10 w-10 items-center justify-center rounded text-white">
                    900
                  </div>
                </div>
              </li>
              <li className="space-y-2">
                <h2 className="text-lg md:text-xl">Links</h2>
                <p
                  className={clsx(
                    "!mt-1 text-sm",
                    "text-gray-600 dark:text-gray-200"
                  )}
                >
                  No style applied, differentiate internal and outside links,
                  give custom cursor for outside links.
                </p>
                <div className="space-x-2">
                  <UnstyledLink href="/">Internal unstiled Links</UnstyledLink>
                  <PrimaryLink href="https://theodorusclarence.com">
                    Outside styled Links
                  </PrimaryLink>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default React.memo(ComponentsPage);
