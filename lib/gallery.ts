import { getCollection } from "./catalog";
import { site } from "./site";

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    by: string;
  };
}

// One lead image per collection, picked so the carousel shows the full range
// of the catalog rather than ten shirts in a row.
const SOURCES: { collection: string; image: number }[] = [
  { collection: "best-sellers", image: 0 },
  { collection: "new-arrivals", image: 1 },
  { collection: "premium", image: 0 },
  { collection: "designer-shirts", image: 2 },
  { collection: "club-wear", image: 0 },
  { collection: "trousers", image: 1 },
  { collection: "co-ords", image: 0 },
  { collection: "travel-wear", image: 1 },
  { collection: "dynamic-looks", image: 0 },
  { collection: "printed-shirts", image: 2 },
];

export function getGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];
  const seen = new Set<string>();

  for (const source of SOURCES) {
    const found = getCollection(source.collection);
    if (!found) continue;
    for (const product of found.products) {
      const image = product.images[source.image] ?? product.images[0];
      if (!image || seen.has(image.src)) continue;
      seen.add(image.src);
      items.push({
        common: product.title,
        binomial: found.def.title,
        photo: {
          url: image.src,
          text: product.description || `${product.title} by ${site.name}.`,
          by: site.name,
        },
      });
      break;
    }
  }

  return items;
}
