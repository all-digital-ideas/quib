"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { discountPercent, formatPrice } from "@/lib/format";
import { addToCart } from "@/lib/store";
import type { CardProduct } from "@/lib/types";
import { PlusIcon } from "./Icons";
import { useUi } from "./Providers";
import WishlistButton from "./WishlistButton";

export default function ProductCard({
  product,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 60vw",
  priority = false,
}: {
  product: CardProduct;
  sizes?: string;
  priority?: boolean;
}) {
  const { openCart } = useUi();
  const [hovered, setHovered] = useState(false);
  const [picking, setPicking] = useState(false);
  const discount = discountPercent(product.price, product.compareAt);
  const href = `/product/${product.slug}`;

  const add = (size: string) => {
    addToCart(product, size);
    setPicking(false);
    openCart();
  };

  return (
    <article
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setPicking(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <Link href={href} className="absolute inset-0" tabIndex={-1} aria-hidden>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-[1.4s] ease-lux group-hover:scale-[1.04]"
          />
          {/* The alternate shot is only requested once the card has been hovered. */}
          {hovered && product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              fill
              sizes={sizes}
              className="object-cover object-top opacity-0 transition-[opacity,transform] duration-700 ease-lux group-hover:scale-[1.04] group-hover:opacity-100"
            />
          )}
        </Link>

        {discount > 0 && (
          <span className="absolute left-3 top-3 bg-bone px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-ink">
            −{discount}%
          </span>
        )}
        <WishlistButton
          product={product}
          className="absolute right-2 top-2 size-10 rounded-full text-ink transition-colors hover:bg-bone/80"
        />

        {picking ? (
          <div className="absolute inset-x-2 bottom-2 bg-bone p-3">
            <p className="eyebrow mb-2 text-[10px] text-stone">Select size</p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  disabled={!s.available}
                  onClick={() => add(s.label)}
                  className="min-w-10 border border-line px-2 py-2 text-xs transition-colors enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-bone disabled:text-stone/50 disabled:line-through"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPicking(true)}
            aria-label={`Quick add ${product.title}`}
            className="eyebrow absolute bottom-2 right-2 grid size-10 place-items-center rounded-full bg-bone text-[10px] text-ink transition-[opacity,transform,background-color,color] duration-500 ease-lux hover:bg-ink hover:text-bone focus-visible:translate-y-0 focus-visible:opacity-100 md:inset-x-2 md:size-auto md:h-11 md:translate-y-3 md:rounded-none md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <PlusIcon width={16} height={16} className="md:hidden" />
            <span className="hidden md:inline">Quick Add</span>
          </button>
        )}
      </div>

      <div className="pt-3.5">
        <h3 className="text-sm leading-snug">
          <Link href={href} className="link-underline line-clamp-1 group-hover:bg-[length:100%_1px]">
            {product.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 text-sm">
          <span className="font-medium">{formatPrice(product.price)}</span>
          {product.compareAt && <s className="text-xs text-stone">{formatPrice(product.compareAt)}</s>}
          {discount > 0 && <span className="text-xs font-medium text-brass">{discount}% off</span>}
        </p>
        {product.color && (
          <p className="mt-1 text-xs text-stone transition-transform duration-500 ease-lux group-hover:translate-x-1">
            {product.color}
          </p>
        )}
      </div>
    </article>
  );
}
