import CollectionView, { collectionMetadata } from "@/components/CollectionView";
import { categoryRoutes } from "@/lib/catalog";

// Top-level category routes: /shop, /new-arrivals, /shirts, /t-shirts,
// /trousers, /co-ords, /club-wear and /sale. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return categoryRoutes.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/[category]">) {
  return collectionMetadata((await params).category);
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  return <CollectionView slug={(await params).category} />;
}
