import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CollectionSection from "@/components/CollectionSection";
import { Breadcrumbs } from "@/components/PageHeader";
import { articles, getArticle } from "@/data/journal";
import { collectionHref, coverImage, getCards, getCollection } from "@/lib/catalog";
import { abs, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const path = `/journal/${article.slug}`;
  const image = `${coverImage(article.cover)}&width=1200`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: { type: "article", title: article.title, description: article.excerpt, url: path, publishedTime: article.date, images: [image] },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [image] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const cover = coverImage(article.cover);
  const collection = getCollection(article.cover);
  const date = new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          image: cover,
          mainEntityOfPage: abs(`/journal/${article.slug}`),
          author: { "@type": "Organization", name: site.legalName },
          publisher: { "@type": "Organization", name: site.legalName },
        }}
      />
      <header className="shell pt-8 md:pt-12">
        <Breadcrumbs trail={[{ name: "Journal", path: "/journal" }, { name: article.title, path: `/journal/${article.slug}` }]} />
        <p className="eyebrow mt-10 flex gap-3 text-stone">
          <span className="text-brass">{article.category}</span>
          <time dateTime={article.date}>{date}</time>
          {article.readTime}
        </p>
        <h1 className="display mt-5 max-w-5xl text-5xl md:text-8xl">{article.title}</h1>
      </header>

      <div className="shell mt-10 grid gap-10 pb-20 md:mt-16 md:pb-28 lg:grid-cols-12">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <Image src={cover} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="font-serif text-2xl italic leading-snug md:text-3xl">{article.excerpt}</p>
          {article.body.map((block, i) => (
            <section key={i} className="mt-9">
              {block.heading && <h2 className="mb-3 font-serif text-3xl">{block.heading}</h2>}
              <p className="text-lg leading-relaxed text-graphite">{block.text}</p>
            </section>
          ))}
          <Link href="/journal" className="eyebrow link-underline mt-12 inline-block">
            ← Back to the Journal
          </Link>
        </div>
      </div>

      {collection && (
        <div className="border-t border-line">
          <CollectionSection
            eyebrow="Shop the story"
            title={collection.def.title}
            description={collection.def.description}
            href={collectionHref(collection.def.slug)}
            products={getCards(collection.def.slug, 10)}
          />
        </div>
      )}
    </article>
  );
}
