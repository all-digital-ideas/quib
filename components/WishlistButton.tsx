"use client";

import { motion } from "motion/react";
import { toggleWishlist, useStore } from "@/lib/store";
import type { CardProduct } from "@/lib/types";
import { HeartIcon } from "./Icons";

export default function WishlistButton({
  product,
  className = "",
  label = false,
}: {
  product: CardProduct;
  className?: string;
  label?: boolean;
}) {
  const { wishlist } = useStore();
  const active = wishlist.some((p) => p.slug === product.slug);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.86 }}
      aria-pressed={active}
      aria-label={active ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
      onClick={() => toggleWishlist(product)}
      className={`inline-flex items-center justify-center gap-3 ${className}`}
    >
      <motion.span
        key={String(active)}
        initial={{ scale: active ? 0.5 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 480, damping: 14 }}
        className="grid place-items-center"
      >
        <HeartIcon width={18} height={18} fill={active ? "currentColor" : "none"} />
      </motion.span>
      {label && <span>{active ? "Saved to wishlist" : "Add to wishlist"}</span>}
    </motion.button>
  );
}
