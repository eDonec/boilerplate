import * as React from 'react';

import { ButtonLink, SEO, UnstyledLink } from 'core-next-components';
import Button from 'core-ui/Button';

import { useAppSelector, useLoadingDispatch } from 'hooks/reduxHooks';

import { decrementCounter, incrementCounter } from '_redux/slices/counter';
import { setCounterAsync } from '_redux/slices/counter/thunk';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const count = useAppSelector((state) => state.counter.count);
  const { isLoading, dispatch, classicDispatch } = useLoadingDispatch();

  const increment = () => {
    classicDispatch(incrementCounter());
  };

  const decrement = () => {
    classicDispatch(decrementCounter());
  };

  const setAsync = () => {
    dispatch(setCounterAsync(300));
  };

  return (
    <>
      <SEO />
      <main>
        <section className=' bg-primary-50 '>
          <div className='layout text-cente flex min-h-screen flex-col items-center  justify-center bg-white'>
            <Vercel className='text-5xl' />
            <h1 className='mt-4'>
              Next.js + Tailwind CSS + TypeScript Starter
            </h1>
            <p className='mt-2 text-sm text-gray-800'>
              A starter for Next.js, Tailwind CSS, and TypeScript with Absolute
              Import, Seo, Link component, pre-configured with Husky{' '}
            </p>
            <p className='mt-2 text-sm text-gray-700'>
              <ButtonLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
                See the repository
              </ButtonLink>
            </p>

            <ButtonLink className='mt-6' href='/components' light>
              See all components
            </ButtonLink>
            <UnstyledLink
              href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
              className='mt-4'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width='92'
                height='32'
                src='https://vercel.com/button'
                alt='Deploy with Vercel'
              />
            </UnstyledLink>
            <h2 className='my-3'>Redux Counter : {count}</h2>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2'>
                <Button disabled={count === 0 || isLoading} onClick={decrement}>
                  Decrement
                </Button>
                <Button disabled={isLoading} onClick={increment}>
                  Increment
                </Button>
              </div>
              <Button onClick={setAsync} isLoading={isLoading}>
                Set Counter to 300 Async
              </Button>
            </div>
            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnstyledLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                Theodorus Clarence
              </UnstyledLink>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
