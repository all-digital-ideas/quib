import { permanentRedirect } from "next/navigation";
import CollectionView, { collectionMetadata } from "@/components/CollectionView";
import { categoryRoutes, getCollectionSlugs } from "@/lib/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/collection/[slug]">) {
  return collectionMetadata((await params).slug);
}

export default async function CollectionPage({ params }: PageProps<"/collection/[slug]">) {
  const { slug } = await params;
  // Collections that own a top-level route live there, to keep one canonical URL.
  if (categoryRoutes.includes(slug)) permanentRedirect(`/${slug}`);
  return <CollectionView slug={slug} />;
}
