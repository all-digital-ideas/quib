"use client";

import { useEffect } from "react";
import { pushRecent, useStore } from "@/lib/store";
import type { CardProduct } from "@/lib/types";
import ProductCarousel from "./ProductCarousel";

/** Records the current product and lists the ones seen before it. */
export default function RecentlyViewed({ current }: { current: CardProduct }) {
  const { recent } = useStore();
  useEffect(() => pushRecent(current), [current]);

  const others = recent.filter((p) => p.slug !== current.slug);
  if (!others.length) return null;
  return (
    <section className="border-t border-line py-14 md:py-20" aria-labelledby="recently-viewed">
      <div className="shell mb-8 md:mb-12">
        <p className="eyebrow mb-3 text-stone">Pick up where you left off</p>
        <h2 id="recently-viewed" className="display text-4xl md:text-6xl">
          Recently Viewed
        </h2>
      </div>
      <ProductCarousel products={others} label="Recently viewed" />
    </section>
  );
}
