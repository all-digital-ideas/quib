"use client";

// Product photography is served by the Shopify CDN, which resizes and
// re-encodes (WebP/AVIF) on the fly, so next/image can build its srcset
// without routing every request through the Next.js optimizer.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const sep = src.includes("?") ? "&" : "?";
  if (src.startsWith("https://cdn.shopify.com/")) {
    return `${src}${sep}width=${width}${quality ? `&quality=${quality}` : ""}`;
  }
  return `${src}${sep}w=${width}`;
}
