"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { addToCart, firstAvailableSize } from "@/lib/store";
import type { CardProduct } from "@/lib/types";
import { useUi } from "./Providers";
import { Reveal } from "./Reveal";

export type LookItem = { label: string; x: number; y: number; product: CardProduct };

export default function ShopTheLook({ image, items }: { image: string; items: LookItem[] }) {
  const { openCart } = useUi();
  const [active, setActive] = useState(0);
  const [sizes, setSizes] = useState<Record<string, string>>(() =>
    Object.fromEntries(items.map((i) => [i.product.slug, firstAvailableSize(i.product) ?? ""])),
  );
  const buyable = items.filter((i) => sizes[i.product.slug]);
  const total = buyable.reduce((n, i) => n + i.product.price, 0);

  const addAll = () => {
    buyable.forEach((i) => addToCart(i.product, sizes[i.product.slug]));
    openCart();
  };

  return (
    <section className="shell py-20 md:py-32" aria-labelledby="shop-the-look">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[3/4] overflow-hidden bg-sand">
            <Image src={image} alt="Model wearing the featured look" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover object-top" />
            {items.map((item, i) => (
              <button
                key={item.product.slug}
                type="button"
                aria-label={`${item.label}: ${item.product.title}`}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
              >
                <span className="absolute size-7 animate-ping rounded-full bg-bone/40 [animation-duration:2.4s] motion-reduce:hidden" />
                <span
                  className={`relative grid size-7 place-items-center rounded-full border border-bone text-[10px] font-semibold transition-colors duration-300 ${
                    active === i ? "bg-bone text-ink" : "bg-ink/40 text-bone backdrop-blur-sm"
                  }`}
                >
                  {i + 1}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow mb-3 text-stone">Styled by the atelier</p>
            <h2 id="shop-the-look" className="display text-5xl md:text-7xl">
              Shop the <em>Look</em>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-graphite">
              One outfit, three pieces. Tap a marker to see what he is wearing.
            </p>
          </Reveal>

          <ul className="mt-8 border-t border-line">
            {items.map((item, i) => {
              const p = item.product;
              return (
                <li
                  key={p.slug}
                  onMouseEnter={() => setActive(i)}
                  className="relative flex items-center gap-4 border-b border-line py-4"
                >
                  {active === i && (
                    <motion.span layoutId="look-marker" className="absolute inset-y-0 -left-3 w-px bg-ink md:-left-5" />
                  )}
                  <Link href={`/product/${p.slug}`} className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-sand md:w-20">
                    <Image src={p.image} alt="" fill sizes="80px" className="object-cover object-top" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow mb-1 text-[10px] text-stone">
                      {String(i + 1).padStart(2, "0")} · {item.label}
                    </p>
                    <Link href={`/product/${p.slug}`} className="link-underline line-clamp-1 text-sm">
                      {p.title}
                    </Link>
                    <p className="mt-1 text-sm text-graphite">{formatPrice(p.price)}</p>
                  </div>
                  <label className="shrink-0">
                    <span className="sr-only">Size for {p.title}</span>
                    <select
                      value={sizes[p.slug]}
                      onChange={(e) => setSizes((s) => ({ ...s, [p.slug]: e.target.value }))}
                      className="h-10 border border-line bg-transparent px-2 text-xs"
                    >
                      {p.sizes.map((s) => (
                        <option key={s.label} value={s.label} disabled={!s.available}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </li>
              );
            })}
          </ul>

          <button type="button" onClick={addAll} disabled={!buyable.length} className="btn btn-dark mt-8 w-full sm:w-auto">
            Shop the Look · {formatPrice(total)}
          </button>
        </div>
      </div>
    </section>
  );
}
