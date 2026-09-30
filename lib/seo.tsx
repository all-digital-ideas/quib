import { site } from "./site";
import type { Product } from "./types";

export const abs = (path: string) => `${site.url}${path}`;

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so catalog text can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  email: site.contact.email,
  telephone: site.contact.phone,
  sameAs: site.social.map((s) => s.href),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    addressLocality: site.contact.address.city,
    addressRegion: site.contact.address.region,
    postalCode: site.contact.address.postalCode,
    addressCountry: site.contact.address.country,
  },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: abs(t.path),
  })),
});

// Ratings in the catalog snapshot are placeholders, so they are deliberately
// left out of structured data until real review data is connected.
export const productSchema = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.title,
  description: p.description || `${p.title} by ${site.name}.`,
  image: p.images.slice(0, 4).map((i) => i.src),
  sku: p.id,
  brand: { "@type": "Brand", name: site.name },
  color: p.colors[0],
  material: p.specs.Fabric,
  ...(p.rating && !p.rating.placeholder
    ? { aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating.value, reviewCount: p.rating.count } }
    : {}),
  offers: {
    "@type": "Offer",
    url: abs(`/product/${p.slug}`),
    priceCurrency: site.currency,
    price: p.price,
    availability: p.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
  },
});
