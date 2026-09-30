import Image from "next/image";
import Link from "next/link";
import { discountPercent, formatPrice } from "@/lib/format";
import type { CardProduct } from "@/lib/types";
import { Reveal } from "./Reveal";

const pillars = [
  { title: "New Collection", text: "Released in small seasonal chapters, never restocked in bulk." },
  { title: "Premium Fabrics", text: "Egyptian, Giza and satin-finished cottons, pre-washed and enzyme-softened." },
  { title: "Limited Designs", text: "Embroidery and hand-work produced in short, numbered runs." },
];

export default function FeaturedCollection({
  lead,
  leadImage,
  products,
  href,
}: {
  lead: CardProduct;
  leadImage: string;
  products: CardProduct[];
  href: string;
}) {
  return (
    <section className="bg-ink py-20 text-bone md:py-32" aria-labelledby="featured-collection">
      <div className="shell">
        <Reveal className="mb-12 grid gap-8 md:mb-20 lg:grid-cols-12">
          <h2 id="featured-collection" className="display text-5xl md:text-7xl lg:col-span-5 min-[1440px]:text-8xl">
            The Designer <em className="text-brass">Atelier</em>
          </h2>
          <ol className="grid gap-6 sm:grid-cols-3 lg:col-span-7 lg:gap-10">
            {pillars.map((p, i) => (
              <li key={p.title} className="border-t border-bone/20 pt-5">
                <p className="eyebrow mb-3">
                  <span className="mr-3 text-brass">{String(i + 1).padStart(2, "0")}</span>
                  {p.title}
                </p>
                <p className="text-sm leading-relaxed text-bone/60">{p.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Link href={`/product/${lead.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-coal lg:aspect-auto lg:h-full lg:min-h-[640px]">
              <Image
                src={leadImage}
                alt={lead.title}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover object-top transition-transform duration-[1.8s] ease-lux group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
                <div>
                  <p className="eyebrow mb-2 text-brass">Signature piece</p>
                  <h3 className="display text-3xl md:text-5xl">{lead.title}</h3>
                </div>
                <p className="shrink-0 text-right text-sm">
                  {formatPrice(lead.price)}
                  {lead.compareAt && <s className="block text-xs text-bone/50">{formatPrice(lead.compareAt)}</s>}
                </p>
              </div>
            </Link>
          </Reveal>

          <ul className="grid grid-cols-2 gap-3 md:gap-5">
            {products.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={0.08 * (i + 1)}>
                  <Link href={`/product/${p.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-coal">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 24vw, 48vw"
                        className="object-cover object-top transition-transform duration-[1.4s] ease-lux group-hover:scale-105"
                      />
                      {discountPercent(p.price, p.compareAt) > 0 && (
                        <span className="absolute left-3 top-3 bg-bone px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-ink">
                          −{discountPercent(p.price, p.compareAt)}%
                        </span>
                      )}
                    </div>
                    <p className="mt-3 line-clamp-1 text-sm">{p.title}</p>
                    <p className="mt-1 text-sm text-bone/60">{formatPrice(p.price)}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-12 text-center md:mt-16">
          <Link href={href} className="btn btn-outline-light">
            View the Full Collection
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
