import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <p className="eyebrow mb-5 text-stone">Error 404</p>
        <h1 className="display text-6xl md:text-9xl">
          Lost the <em>thread</em>
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-graphite">This page has moved or no longer exists. The collection is still here.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-dark">
            Back to Home
          </Link>
          <Link href="/shop" className="btn btn-outline">
            Shop All
          </Link>
        </div>
      </div>
    </div>
  );
}
