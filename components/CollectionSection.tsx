import Link from "next/link";
import type { CardProduct } from "@/lib/types";
import ProductCarousel from "./ProductCarousel";
import { Reveal } from "./Reveal";

export default function CollectionSection({
  title,
  description,
  href,
  products,
  index,
  eyebrow,
}: {
  title: string;
  description: string;
  href: string;
  products: CardProduct[];
  index?: number;
  eyebrow?: string;
}) {
  if (!products.length) return null;
  return (
    <section className="py-14 md:py-20" aria-labelledby={`collection-${href}`}>
      <Reveal className="shell mb-8 flex items-end justify-between gap-6 md:mb-12">
        <div>
          <p className="eyebrow mb-3 text-stone">
            {index !== undefined && <span className="mr-3 text-brass">{String(index).padStart(2, "0")}</span>}
            {eyebrow ?? "Collection"}
          </p>
          <h2 id={`collection-${href}`} className="display text-4xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite md:text-base">{description}</p>
        </div>
        <Link href={href} className="eyebrow group flex shrink-0 items-center gap-2 border-b border-ink pb-1.5">
          View All
          <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
        </Link>
      </Reveal>
      <Reveal delay={0.1}>
        <ProductCarousel products={products} label={title} />
      </Reveal>
    </section>
  );
}
