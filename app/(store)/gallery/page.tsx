import type { Metadata } from "next";
import GallerySection from "@/components/GallerySection";
import { getGalleryItems } from "@/lib/gallery";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore the Quib Fashion lookbook — premium shirts, trousers, co-ords and club wear photographed in detail. Browse our gallery of menswear imagery from Surat.",
  alternates: { canonical: "/gallery" },
  keywords: [
    "Quib Fashion gallery",
    "premium menswear photos",
    "designer shirts images",
    "mens fashion lookbook India",
    "Quib Fashion lookbook",
  ],
  openGraph: {
    title: `Gallery ${site.name}`,
    description:
      "Browse the Quib Fashion lookbook — premium shirts, trousers, co-ords and club wear photographed in detail.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <GallerySection items={items} />
    </>
  );
}
