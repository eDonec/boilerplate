// !STARTERCONF You can delete this page
import * as React from 'react';

import {
  ButtonLink,
  PrimaryLink,
  SEO,
  UnstyledLink,
} from 'core-next-components';
import Button from 'core-ui/Button';
import clsx from 'core-utils/clsx';

import { colorList } from 'constants/colorList';

import Layout from 'components/layout/Layout';

type Color = typeof colorList[number];

export default function ComponentsPage() {
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');
  const [color, setColor] = React.useState<Color>('sky');

  function toggleMode() {
    return setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  }

  const textColor = mode === 'dark' ? 'text-gray-200' : 'text-gray-600';

  return (
    <Layout>
      <SEO description='Pre-built components with awesome default' />

      <main className='dark'>
        <section
          className={`${
            mode === 'dark' ? 'bg-dark' : 'bg-gray-50'
          } ${color}  transition-[background-color] duration-700`}
        >
          <div
            className={clsx(
              'layout min-h-screen py-20',
              mode === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <h1>Built-in Components</h1>
            <ButtonLink outline className='mt-2' href='/'>
              Back to Home
            </ButtonLink>

            <div className='mt-8 flex flex-wrap gap-2'>
              <Button
                onClick={toggleMode}
                light={mode === 'dark'}
                dark={mode !== 'dark'}
              >
                Set to {mode === 'dark' ? 'light' : 'dark'}
              </Button>
              <Button isLoading outline onClick={toggleMode}>
                Outline
              </Button>
              {/* <Button onClick={randomize}>Randomize CSS Variable</Button> */}
            </div>

            <ol className='mt-8 space-y-6'>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Customize Colors</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  You can change primary color to any Tailwind CSS colors. See
                  globals.css to change your color.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <select
                    name='color'
                    id='color'
                    value={color}
                    className={clsx(
                      'block max-w-xs rounded',
                      mode === 'dark'
                        ? 'bg-dark border border-gray-600 duration-700'
                        : 'border-gray-300 bg-white',
                      'focus:border-primary-400 focus:ring-primary-400 focus:outline-none focus:ring'
                    )}
                    onChange={(e) => setColor(e.target.value as Color)}
                  >
                    {colorList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ButtonLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/src/styles/colors.css'>
                    Check list of colors
                  </ButtonLink>
                </div>
                <div className='flex flex-wrap gap-2 text-xs font-medium'>
                  <div className='bg-primary-50 flex h-10 w-10 items-center justify-center rounded text-black'>
                    50
                  </div>
                  <div className='bg-primary-100 flex h-10 w-10 items-center justify-center rounded text-black'>
                    100
                  </div>
                  <div className='bg-primary-200 flex h-10 w-10 items-center justify-center rounded text-black'>
                    200
                  </div>
                  <div className='bg-primary-300 flex h-10 w-10 items-center justify-center rounded text-black'>
                    300
                  </div>
                  <div className='bg-primary-400 flex h-10 w-10 items-center justify-center rounded text-black'>
                    400
                  </div>
                  <div className='bg-primary-500 flex h-10 w-10 items-center justify-center rounded text-black'>
                    500
                  </div>
                  <div className='bg-primary-600 flex h-10 w-10 items-center justify-center rounded text-white'>
                    600
                  </div>
                  <div className='bg-primary-700 flex h-10 w-10 items-center justify-center rounded text-white'>
                    700
                  </div>
                  <div className='bg-primary-800 flex h-10 w-10 items-center justify-center rounded text-white'>
                    800
                  </div>
                  <div className='bg-primary-900 flex h-10 w-10 items-center justify-center rounded text-white'>
                    900
                  </div>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>UnstyledLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  No style applied, differentiate internal and outside links,
                  give custom cursor for outside links.
                </p>
                <div className='space-x-2'>
                  <UnstyledLink href='/'>Internal Links</UnstyledLink>
                  <UnstyledLink href='https://theodorusclarence.com'>
                    Outside Links
                  </UnstyledLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>PrimaryLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Add styling on top of UnstyledLink, giving a primary color to
                  the link.
                </p>
                <div className='space-x-2'>
                  <PrimaryLink href='/'>Internal Links</PrimaryLink>
                  <PrimaryLink href='https://theodorusclarence.com'>
                    Outside Links
                  </PrimaryLink>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </Layout>
  );
}
