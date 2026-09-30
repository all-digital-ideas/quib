"use client";

import { useEffect, useRef, useState } from "react";
import type { CardProduct } from "@/lib/types";
import { ArrowIcon } from "./Icons";
import ProductCard from "./ProductCard";

/** Native scroll-snap rail: swipe on touch, arrow buttons on pointer devices. */
export default function ProductCarousel({ products, label }: { products: CardProduct[]; label: string }) {
  const rail = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });
  const arrow =
    "hidden md:grid absolute top-[38%] z-10 size-12 place-items-center rounded-full bg-bone text-ink shadow-[0_8px_30px_-12px_rgb(14_14_13/0.5)] transition-[opacity,transform] duration-500 ease-lux hover:scale-105 disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="relative" role="region" aria-label={label}>
      <button type="button" aria-label="Previous products" disabled={edge.start} onClick={() => move(-1)} className={`${arrow} left-4 xl:left-8`}>
        <ArrowIcon className="rotate-180" />
      </button>
      <button type="button" aria-label="Next products" disabled={edge.end} onClick={() => move(1)} className={`${arrow} right-4 xl:right-8`}>
        <ArrowIcon />
      </button>
      <ul
        ref={rail}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 md:gap-5 md:scroll-px-10 md:px-10 min-[1440px]:scroll-px-16 min-[1440px]:px-16"
      >
        {products.map((p) => (
          <li key={p.slug} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] md:w-[29vw] lg:w-[22.5vw] min-[1440px]:w-[19vw]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
