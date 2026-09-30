"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { discountPercent, formatPrice, swatch } from "@/lib/format";
import { site } from "@/lib/site";
import { addToCart } from "@/lib/store";
import type { CardProduct, Product } from "@/lib/types";
import { QuantityStepper } from "./CartDrawer";
import { StarIcon } from "./Icons";
import { useUi } from "./Providers";
import SizeSelector from "./SizeSelector";
import WishlistButton from "./WishlistButton";

function Disclosure({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="eyebrow flex min-h-14 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-base font-light transition-transform duration-300 group-open:rotate-45">+</span>
      </summary>
      <div className="pb-6 text-sm leading-relaxed text-graphite">{children}</div>
    </details>
  );
}

export default function ProductInfo({ product, card }: { product: Product; card: CardProduct }) {
  const router = useRouter();
  const { openCart } = useUi();
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 && product.sizes[0].available ? product.sizes[0].label : null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const discount = discountPercent(product.price, product.compareAt);
  const specs = Object.entries(product.specs);

  const commit = (then: () => void) => {
    if (!size) {
      setError(true);
      document.getElementById("size-selector")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addToCart(card, size, qty);
    then();
  };

  return (
    <div>
      <p className="eyebrow mb-3 text-stone">{site.name} · {product.type}</p>
      <h1 className="display text-4xl md:text-5xl">{product.title}</h1>

      {product.rating && (
        <p className="mt-4 flex items-center gap-2 text-sm" aria-label={`Rated ${product.rating.value} out of 5 from ${product.rating.count} reviews`}>
          <span className="flex text-brass" aria-hidden>
            {[1, 2, 3, 4, 5].map((n) => (
              <StarIcon key={n} width={14} height={14} opacity={n <= Math.round(product.rating!.value) ? 1 : 0.25} />
            ))}
          </span>
          <span className="font-medium">{product.rating.value.toFixed(1)}</span>
          <span className="text-stone">({product.rating.count} reviews)</span>
        </p>
      )}

      <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-3xl">{formatPrice(product.price)}</span>
        {product.compareAt && <s className="text-stone">{formatPrice(product.compareAt)}</s>}
        {discount > 0 && <span className="eyebrow bg-ink px-2 py-1 text-[10px] text-bone">Save {discount}%</span>}
      </p>
      <p className="mt-1.5 text-xs text-stone">MRP inclusive of all taxes</p>

      {product.description && <p className="mt-6 leading-relaxed text-graphite">{product.description}</p>}

      {product.colors.length > 0 && (
        <div className="mt-8">
          <p className="eyebrow mb-3">
            Colour <span className="ml-2 text-stone">{product.colors[0]}</span>
          </p>
          <ul className="flex gap-2.5">
            {product.colors.map((c, i) => (
              <li
                key={c}
                title={c}
                className={`size-8 rounded-full border border-line p-[3px] ${i === 0 ? "outline outline-1 outline-offset-2 outline-ink" : ""}`}
              >
                <span className="block size-full rounded-full" style={{ background: swatch(c) }} />
                <span className="sr-only">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <SizeSelector
          sizes={product.sizes}
          value={size}
          onChange={(s) => {
            setSize(s);
            setError(false);
          }}
          kind={product.type === "trouser" ? "bottom" : "top"}
          error={error}
        />
      </div>

      <div className="mt-8 flex items-center gap-4">
        <p className="eyebrow">Quantity</p>
        <QuantityStepper value={qty} onChange={(n) => setQty(Math.min(Math.max(n, 1), 10))} label={product.title} />
      </div>

      {product.available ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button type="button" className="btn btn-dark" onClick={() => commit(openCart)}>
            Add to Cart
          </button>
          <button type="button" className="btn btn-outline" onClick={() => commit(() => router.push("/checkout"))}>
            Buy Now
          </button>
        </div>
      ) : (
        <button type="button" disabled className="btn btn-dark mt-8 w-full">
          Sold Out
        </button>
      )}
      <WishlistButton product={card} label className="eyebrow mt-5 text-[10px]" />

      <ul className="mt-8 grid grid-cols-3 gap-3 border-y border-line py-5 text-center text-xs text-graphite">
        <li>Free shipping over {formatPrice(site.freeShippingThreshold)}</li>
        <li className="border-x border-line px-2">7-day easy exchange</li>
        <li>COD &amp; UPI available</li>
      </ul>

      <div className="mt-2">
        {specs.length > 0 && (
          <Disclosure title="Product Details" open>
            <dl className="grid grid-cols-[7rem_1fr] gap-y-2">
              {specs.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-stone">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Disclosure>
        )}
        <Disclosure title="Craft & Quality">
          Sewn at sixteen stitches per inch on Japanese machines. The cloth is pre-washed to prevent shrinkage and
          enzyme-treated for softness. A spare button is included.
        </Disclosure>
        <Disclosure title="Shipping & Returns">
          Dispatched within 24–48 hours across India. Exchange or return within 7 days of delivery, provided the piece
          is unworn with tags attached.
        </Disclosure>
      </div>

      {/* Mobile purchase bar */}
      {product.available && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-line bg-bone/95 px-5 py-3 backdrop-blur-xl lg:hidden">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-xs text-stone">{size ? `Size ${size}` : "Select a size"}</p>
            <p className="font-medium">{formatPrice(product.price * qty)}</p>
          </div>
          <button type="button" className="btn btn-dark min-h-12 flex-1" onClick={() => commit(openCart)}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}
