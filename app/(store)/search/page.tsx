import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductGrid from "@/components/ProductGrid";
import { getCards, searchProducts, toCard } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Quib Fashion collection of shirts, tees, trousers and co-ords.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

const suggestions = ["Embroidered", "Black shirt", "Satin", "Checks", "Polo", "Trouser", "Linen"];

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 80) ?? "";
  const results = query ? searchProducts(query).map(toCard) : [];

  return (
    <>
      <PageHeader title="Search" trail={[{ name: "Search", path: "/search" }]}>
        <Form action="/search" className="mt-10 flex max-w-3xl border-b border-ink">
          <label htmlFor="q" className="sr-only">
            Search products
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            autoFocus={!query}
            placeholder="What are you looking for?"
            className="h-16 min-w-0 flex-1 bg-transparent font-serif text-2xl placeholder:text-stone focus:outline-none md:text-4xl"
          />
          <button type="submit" className="eyebrow shrink-0 pl-4">
            Search →
          </button>
        </Form>
        <ul className="mt-6 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <li key={s}>
              <Link
                href={`/search?q=${encodeURIComponent(s)}`}
                className="block border border-line px-3.5 py-2 text-xs transition-colors hover:border-ink"
              >
                {s}
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="shell pb-24 md:pb-32">
        {query && results.length === 0 && (
          <p className="mb-12 font-serif text-3xl">
            Nothing found for “{query}”. <span className="text-stone">Here is what others are wearing.</span>
          </p>
        )}
        {query && results.length > 0 ? (
          <ProductGrid key={query} products={results} />
        ) : (
          <ProductGrid products={getCards("best-sellers", 8)} sortable={false} />
        )}
      </div>
    </>
  );
}
