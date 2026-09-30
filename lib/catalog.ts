// Server-side data access. Everything the UI knows about products flows through
// here, so swapping catalog.json for a live API only means changing this file.
import catalog from "@/data/catalog.json";
import defs from "@/data/collections.json";
import { site } from "./site";
import type { CardProduct, CollectionDef, NavItem, Product } from "./types";

const products = catalog.products as Product[];
const bySlug = new Map(products.map((p) => [p.slug, p]));
const membership = catalog.collections as Record<string, string[]>;

const resolve = (slugs: string[]) => slugs.map((s) => bySlug.get(s)).filter((p): p is Product => !!p);

const discountOf = (p: Product) => (p.compareAt ? 1 - p.price / p.compareAt : 0);

// Collections that are computed from the catalog rather than synced.
const virtual: Record<string, CollectionDef & { pick: () => Product[] }> = {
  shop: {
    slug: "shop",
    title: "Shop All",
    description: "The complete wardrobe. Shirts, tees, trousers and co-ords in one place.",
    pick: () => products,
  },
  shirts: {
    slug: "shirts",
    title: "Shirts",
    description: "Designer, plain, printed, checked and striped. The shirt, in every register.",
    pick: () => products.filter((p) => p.type === "shirt"),
  },
};

export const categoryRoutes = ["shop", "new-arrivals", "shirts", "t-shirts", "trousers", "co-ords", "club-wear", "sale"];

export function collectionHref(slug: string) {
  return categoryRoutes.includes(slug) ? `/${slug}` : `/collection/${slug}`;
}

export function getAllProducts() {
  return products;
}

export function getProduct(slug: string) {
  return bySlug.get(slug) ?? null;
}

export function getCollectionSlugs() {
  return [...Object.keys(virtual), ...defs.map((d) => d.slug)];
}

export function getCollection(slug: string): { def: CollectionDef; products: Product[] } | null {
  if (virtual[slug]) {
    const { pick, ...def } = virtual[slug];
    return { def, products: pick() };
  }
  const def = defs.find((d) => d.slug === slug);
  if (!def) return null;
  let list = resolve(membership[slug] ?? []);
  if (slug === "sale") {
    // Top the synced sale edit up with the deepest markdowns in the catalog.
    const seen = new Set(list.map((p) => p.slug));
    const extra = products
      .filter((p) => !seen.has(p.slug) && discountOf(p) >= 0.5)
      .sort((a, b) => discountOf(b) - discountOf(a));
    list = [...list, ...extra].slice(0, 60);
  }
  return { def: { slug: def.slug, title: def.title, description: def.description }, products: list };
}

export function toCard(p: Product): CardProduct {
  return {
    slug: p.slug,
    title: p.title,
    type: p.type,
    price: p.price,
    compareAt: p.compareAt,
    image: p.images[0].src,
    hoverImage: p.images[1]?.src ?? null,
    color: p.colors[0] ?? null,
    sizes: p.sizes,
  };
}

export function getCards(slug: string, limit?: number): CardProduct[] {
  const list = getCollection(slug)?.products ?? [];
  return (limit ? list.slice(0, limit) : list).map(toCard);
}

export function getRelated(p: Product, limit = 8): Product[] {
  const pool = new Map<string, Product>();
  for (const c of p.collections) {
    for (const q of resolve(membership[c] ?? [])) {
      if (q.slug !== p.slug && q.type === p.type) pool.set(q.slug, q);
    }
  }
  for (const q of products) {
    if (pool.size >= limit * 2) break;
    if (q.slug !== p.slug && q.type === p.type) pool.set(q.slug, q);
  }
  return [...pool.values()].slice(0, limit);
}

export function searchProducts(query: string, limit = 48): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const scored: [number, Product][] = [];
  for (const p of products) {
    const title = p.title.toLowerCase();
    const rest = [p.type, ...p.colors, ...p.tags, ...Object.values(p.specs)].join(" ").toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (title.includes(t)) score += 3;
      else if (rest.includes(t)) score += 1;
      else {
        score = 0;
        break;
      }
    }
    if (score) scored.push([score, p]);
  }
  return scored
    .sort((a, b) => b[0] - a[0])
    .slice(0, limit)
    .map(([, p]) => p);
}

/** Lead image of a product, or of a collection's first product as a fallback. */
export function editorialProduct(slug: string, fallbackCollection = "best-sellers"): Product {
  return bySlug.get(slug) ?? getCollection(fallbackCollection)?.products[0] ?? products[0];
}

/** Lead image of a collection, used for navigation and journal covers. */
export const coverImage = (collection: string) => (getCollection(collection)?.products[0] ?? products[0]).images[0].src;
const lead = coverImage;

export function getNav(): NavItem[] {
  return [
    {
      label: "New Arrivals",
      href: "/new-arrivals",
      mega: {
        columns: [
          {
            heading: "Discover",
            links: [
              { label: "New Arrivals", href: "/new-arrivals" },
              { label: "Best Sellers", href: "/collection/best-sellers" },
              { label: "Dynamic Looks", href: "/collection/dynamic-looks" },
              { label: "Travel Wear", href: "/collection/travel-wear" },
              { label: "The Lux Edit", href: "/collection/premium" },
            ],
          },
          {
            heading: "Shop by Style",
            links: site.styles.map((s) => ({ label: s.label, href: collectionHref(s.collection) })),
          },
        ],
        features: [
          { label: "Just Dropped", href: "/new-arrivals", image: lead("new-arrivals") },
          { label: "Most Wanted", href: "/collection/best-sellers", image: lead("best-sellers") },
        ],
      },
    },
    {
      label: "Shirts",
      href: "/shirts",
      mega: {
        columns: [
          {
            heading: "Shirts",
            links: [
              { label: "All Shirts", href: "/shirts" },
              { label: "Designer", href: "/collection/designer-shirts" },
              { label: "Plain", href: "/collection/plain-shirts" },
              { label: "Printed", href: "/collection/printed-shirts" },
            ],
          },
          {
            heading: "Pattern & Layer",
            links: [
              { label: "Checks", href: "/collection/check-shirts" },
              { label: "Stripes", href: "/collection/stripe-shirts" },
              { label: "Over Shirts", href: "/collection/over-shirts" },
              { label: "Formal", href: "/collection/formal" },
            ],
          },
        ],
        features: [
          { label: "Designer Shirts", href: "/collection/designer-shirts", image: lead("designer-shirts") },
          { label: "The Lux Edit", href: "/collection/premium", image: lead("premium") },
        ],
      },
    },
    { label: "T-Shirts", href: "/t-shirts" },
    { label: "Trousers", href: "/trousers" },
    { label: "Co-Ords", href: "/co-ords" },
    { label: "Club Wear", href: "/club-wear" },
    { label: "Sale", href: "/sale", accent: true },
  ];
}
