import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
          <h1 className="mt-8 text-4xl md:text-6xl">Page Not Found</h1>
          <Link className="mt-4 md:text-lg" href="/">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
