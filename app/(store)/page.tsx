import BrandStory from "@/components/BrandStory";
import CategoryMarquee from "@/components/CategoryMarquee";
import CollectionSection from "@/components/CollectionSection";
import EditorialSection from "@/components/EditorialSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import Hero from "@/components/Hero";
import Journal from "@/components/Journal";
import Newsletter from "@/components/Newsletter";
import ShopTheLook from "@/components/ShopTheLook";
import SocialGallery from "@/components/SocialGallery";
import StyleCategories from "@/components/StyleCategories";
import { articles } from "@/data/journal";
import { collectionHref, coverImage, editorialProduct, getCards, getCollection, toCard } from "@/lib/catalog";
import { site } from "@/lib/site";

const CAROUSEL_SIZE = 10;

export default function HomePage() {
  const { editorial } = site;
  const hero = editorialProduct(editorial.hero, "club-wear");
  const gentleman = editorialProduct(editorial.gentleman, "premium");
  const story = editorialProduct(editorial.story, "designer-shirts");
  const lookImage = editorialProduct(editorial.look.image, "premium");

  const designer = getCollection("designer-shirts")?.products ?? [];
  const bestSellers = getCollection("best-sellers")?.products ?? [];

  const sections = site.homeCollections.flatMap((slug) => {
    const c = getCollection(slug);
    return c && c.products.length ? [c] : [];
  });
  // Best sellers lead the page as "Selling Fast"; the rest follow the story.
  const [newArrivals, ...rest] = sections.filter((c) => c.def.slug !== "best-sellers");

  return (
    <>
      <Hero image={hero.images[0].src} product={{ title: hero.title, slug: hero.slug, price: hero.price }} />
      <CategoryMarquee />

      <CollectionSection
        eyebrow="Selling Fast"
        title="Going, going"
        description="The pieces leaving the atelier fastest this week."
        href={collectionHref("best-sellers")}
        products={bestSellers.slice(0, CAROUSEL_SIZE).map(toCard)}
      />

      <EditorialSection
        image={gentleman.images[0].src}
        products={[getCards("trousers", 1)[0], getCards("premium", 3)[2]].filter(Boolean)}
      />

      <StyleCategories
        styles={site.styles.map((s) => {
          const list = getCollection(s.collection)?.products ?? [];
          return {
            label: s.label,
            note: s.note,
            href: collectionHref(s.collection),
            image: (list[1] ?? list[0] ?? hero).images[0].src,
          };
        })}
      />

      {designer.length > 0 && (
        <FeaturedCollection
          lead={toCard(designer[0])}
          leadImage={designer[0].images[0].src}
          products={designer.slice(1, 5).map(toCard)}
          href={collectionHref("designer-shirts")}
        />
      )}

      {newArrivals && (
        <CollectionSection
          index={1}
          title={newArrivals.def.title}
          description={newArrivals.def.description}
          href={collectionHref(newArrivals.def.slug)}
          products={newArrivals.products.slice(0, CAROUSEL_SIZE).map(toCard)}
        />
      )}

      <ShopTheLook
        image={lookImage.images[0].src}
        items={editorial.look.items.flatMap((item) => {
          const p = editorialProduct(item.slug, item.label === "Trouser" ? "trousers" : "over-shirts");
          return p ? [{ label: item.label, x: item.x, y: item.y, product: toCard(p) }] : [];
        })}
      />

      <BrandStory image={story.images[0].src} />

      <div className="divide-y divide-line">
        {rest.map((c, i) => (
          <CollectionSection
            key={c.def.slug}
            index={i + 2}
            title={c.def.title}
            description={c.def.description}
            href={collectionHref(c.def.slug)}
            products={c.products.slice(0, CAROUSEL_SIZE).map(toCard)}
          />
        ))}
      </div>

      <Journal
        entries={articles.map((a) => ({
          slug: a.slug,
          title: a.title,
          category: a.category,
          excerpt: a.excerpt,
          readTime: a.readTime,
          image: coverImage(a.cover),
        }))}
      />

      <SocialGallery
        images={bestSellers.slice(2, 8).map((p) => ({ src: (p.images[2] ?? p.images[0]).src, alt: p.title }))}
      />

      <Newsletter />
    </>
  );
}
