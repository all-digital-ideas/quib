import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collectionHref, getCollection, toCard } from "@/lib/catalog";
import PageHeader from "./PageHeader";
import ProductGrid from "./ProductGrid";

export function collectionMetadata(slug: string): Metadata {
  const c = getCollection(slug);
  if (!c) return {};
  const path = collectionHref(slug);
  const image = c.products[0]?.images[0];
  return {
    title: `${c.def.title} for Men`,
    description: c.def.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${c.def.title} for Men`,
      description: c.def.description,
      url: path,
      images: image ? [{ url: `${image.src}&width=1200`, alt: c.def.title }] : undefined,
    },
  };
}

export default function CollectionView({ slug }: { slug: string }) {
  const c = getCollection(slug);
  if (!c) notFound();
  return (
    <>
      <PageHeader title={c.def.title} description={c.def.description} trail={[{ name: c.def.title, path: collectionHref(slug) }]} />
      <div className="shell pb-24 md:pb-32">
        {c.products.length ? (
          <ProductGrid products={c.products.map(toCard)} />
        ) : (
          <p className="border-y border-line py-16 text-center text-stone">New pieces are on their way. Check back soon.</p>
        )}
      </div>
    </>
  );
}
