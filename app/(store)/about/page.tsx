import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BrandStory from "@/components/BrandStory";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { editorialProduct } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Quib Fashion brings contemporary design and old-school tailoring together. Learn how our shirts are made in Surat.",
  alternates: { canonical: "/about" },
  openGraph: { title: `About ${site.name}`, url: "/about" },
};

const craft = [
  {
    title: "Stitching",
    text: "Every seam is sewn at sixteen stitches per inch on premium Japanese sewing machines. It takes longer, and it is why the collar still sits right after a year of wear.",
  },
  {
    title: "Fabric",
    text: "We work with a small group of mills for Egyptian cotton, Giza cotton and premium cotton. The cloth is pre-washed to prevent shrinkage and enzyme-treated for softness; many carry an easy-care finish.",
  },
  {
    title: "Buttons",
    text: "Genuine mother-of-pearl, hand-carved. A small detail with a depth and coolness that plastic cannot imitate.",
  },
  {
    title: "Fit",
    text: "Standard sizes, carefully graded. Fit, structure and elegance come first, and the price stays within reach.",
  },
];

export default function AboutPage() {
  const story = editorialProduct(site.editorial.story, "designer-shirts");
  const portrait = editorialProduct(site.editorial.gentleman, "premium");
  return (
    <>
      <PageHeader
        title="Quality is always in trend."
        description="Quib Fashion is a standard-size clothing label from Surat, made to foster style in the urban man by pairing contemporary product design and technology with old-school tailoring."
        trail={[{ name: "About", path: "/about" }]}
      />

      <section className="shell grid gap-10 pb-20 md:pb-32 lg:grid-cols-12">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-sand lg:col-span-5">
          <Image src={portrait.images[0].src} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top" />
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="eyebrow mb-8 text-stone">How it is made</h2>
          <ol>
            {craft.map((c, i) => (
              <li key={c.title} className="border-t border-line py-7">
                <Reveal delay={i * 0.05} className="grid gap-3 md:grid-cols-[8rem_1fr]">
                  <h3 className="font-serif text-3xl">
                    <span className="eyebrow mr-3 align-middle text-brass">{String(i + 1).padStart(2, "0")}</span>
                    {c.title}
                  </h3>
                  <p className="leading-relaxed text-graphite">{c.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BrandStory image={story.images[0].src} cta={false} />

      <section className="shell py-20 text-center md:py-28">
        <h2 className="display text-5xl md:text-7xl">
          See it for <em>yourself</em>
        </h2>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/new-arrivals" className="btn btn-dark">
            Shop New Arrivals
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
