import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/PageHeader";
import ProductCarousel from "@/components/ProductCarousel";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import RecentlyViewed from "@/components/RecentlyViewed";
import { collectionHref, getAllProducts, getCollection, getProduct, getRelated, toCard } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { JsonLd, productSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const description =
    product.description || `${product.title} by ${site.name}. ${formatPrice(product.price)}, free shipping above ₹${site.freeShippingThreshold}.`;
  const path = `/product/${product.slug}`;
  const image = { url: `${product.images[0].src}&width=1200`, alt: product.title };
  return {
    title: product.title,
    description,
    alternates: { canonical: path },
    openGraph: { title: product.title, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title: product.title, description, images: [image.url] },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const card = toCard(product);
  const home = product.collections.map((c) => getCollection(c)).find((c) => c)?.def;
  const trail = [
    ...(home ? [{ name: home.title, path: collectionHref(home.slug) }] : []),
    { name: product.title, path: `/product/${product.slug}` },
  ];
  const related = getRelated(product, 10).map(toCard);

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <div className="shell pt-6 md:pt-10">
        <Breadcrumbs trail={trail} />
      </div>

      <div className="mt-6 grid gap-10 pb-16 shell max-lg:px-0 lg:grid-cols-12 lg:gap-12 lg:pb-24">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} title={product.title} />
        </div>
        <div className="px-5 md:px-10 lg:col-span-5 lg:px-0 xl:col-span-4 xl:col-start-9">
          <div className="lg:sticky lg:top-24">
            <ProductInfo product={product} card={card} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line py-14 md:py-20" aria-labelledby="recommended">
          <div className="shell mb-8 md:mb-12">
            <p className="eyebrow mb-3 text-stone">Complete the wardrobe</p>
            <h2 id="recommended" className="display text-4xl md:text-6xl">
              You May Also Like
            </h2>
          </div>
          <ProductCarousel products={related} label="Recommended products" />
        </section>
      )}

      <RecentlyViewed current={card} />
      {/* Clearance for the fixed mobile purchase bar. */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
