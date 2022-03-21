import { ButtonLink, SEO } from 'core-next-components';

import Layout from 'components/layout/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <ButtonLink className='mt-4 md:text-lg' href='/'>
              Back to Home
            </ButtonLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
