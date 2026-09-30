export type ProductImage = { src: string; width: number; height: number };

export type Size = { label: string; available: boolean };

export type Product = {
  id: string;
  slug: string;
  title: string;
  type: string;
  price: number;
  compareAt: number | null;
  colors: string[];
  sizes: Size[];
  available: boolean;
  images: ProductImage[];
  description: string;
  specs: Record<string, string>;
  tags: string[];
  rating: { value: number; count: number; placeholder?: boolean } | null;
  createdAt: string;
  collections: string[];
};

/** The slice of a product that cards, the cart and the wishlist need on the client. */
export type CardProduct = {
  slug: string;
  title: string;
  type: string;
  price: number;
  compareAt: number | null;
  image: string;
  hoverImage: string | null;
  color: string | null;
  sizes: Size[];
};

export type CollectionDef = {
  slug: string;
  title: string;
  description: string;
};

export type CartLine = {
  key: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  compareAt: number | null;
  size: string;
  color: string | null;
  qty: number;
};

export type NavFeature = { label: string; href: string; image: string };

export type NavItem = {
  label: string;
  href: string;
  accent?: boolean;
  mega?: {
    columns: { heading: string; links: { label: string; href: string }[] }[];
    features: NavFeature[];
  };
};
