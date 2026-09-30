"use client";

import { useMemo, useState } from "react";
import { discountPercent } from "@/lib/format";
import type { CardProduct } from "@/lib/types";
import ProductCard from "./ProductCard";

const PAGE = 24;
const SORTS = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  discount: "Biggest Discount",
} as const;
type Sort = keyof typeof SORTS;

export default function ProductGrid({ products, sortable = true }: { products: CardProduct[]; sortable?: boolean }) {
  const [sort, setSort] = useState<Sort>("featured");
  const [visible, setVisible] = useState(PAGE);

  const sorted = useMemo(() => {
    if (sort === "featured") return products;
    const list = [...products];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "discount") list.sort((a, b) => discountPercent(b.price, b.compareAt) - discountPercent(a.price, a.compareAt));
    return list;
  }, [products, sort]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between border-y border-line py-4">
        <p className="eyebrow text-stone">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
        {sortable && (
          <label className="eyebrow flex items-center gap-3">
            <span className="text-stone">Sort</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as Sort);
                setVisible(PAGE);
              }}
              className="eyebrow bg-transparent py-1 pr-1"
            >
              {Object.entries(SORTS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 md:gap-y-14 xl:grid-cols-4">
        {sorted.slice(0, visible).map((p, i) => (
          <li key={p.slug}>
            <ProductCard product={p} priority={i < 4} sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw" />
          </li>
        ))}
      </ul>

      {visible < sorted.length && (
        <div className="mt-16 text-center">
          <p className="mb-4 text-xs text-stone">
            Showing {visible} of {sorted.length}
          </p>
          <button type="button" className="btn btn-outline" onClick={() => setVisible((v) => v + PAGE)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
