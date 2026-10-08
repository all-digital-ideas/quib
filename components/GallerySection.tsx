"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";
import { CircularGallery } from "./CircularGallery";
import { CloseIcon } from "./Icons";
import { EASE } from "./Providers";

function ExpandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

/**
 * Dark lookbook band: a scroll-driven circular gallery on desktop, a simple
 * grid on mobile, and a lightbox for both. Used by the home page and the
 * /gallery route with the same items.
 */
export default function GallerySection({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  if (!items.length) return null;

  return (
    <section className="relative bg-ink text-bone" aria-labelledby="gallery-heading">
      <div className="shell pb-10 pt-16 text-center md:pb-14 md:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="eyebrow mb-4 text-brass"
        >
          Gallery
        </motion.p>
        <motion.h2
          id="gallery-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          className="display text-5xl md:text-7xl"
        >
          The <em>Lookbook</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.16 }}
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-bone/50"
        >
          <span className="md:hidden">Tap any frame to view it up close.</span>
          <span className="hidden md:inline">Scroll to explore the collection.</span>
        </motion.p>
      </div>

      {/* Desktop: sticky circular gallery, one full turn over 400vh of scroll. */}
      <div data-gallery-scroll className="relative hidden h-[400vh] w-full md:block">
        <div className="sticky top-[100px] flex h-[calc(100vh-100px)] w-full items-center justify-center overflow-hidden">
          <CircularGallery items={items} onItemClick={setSelected} />
        </div>
      </div>

      {/* Mobile: grid with the same images. */}
      <div className="shell pb-16 md:hidden">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <motion.li
              key={item.photo.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: Math.min(index * 0.08, 0.4) }}
            >
              <button
                type="button"
                onClick={() => setSelected(item)}
                className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-lg bg-coal"
              >
                <Image
                  src={item.photo.url}
                  alt={item.photo.text}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-lux group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-full p-4 text-left transition-transform duration-300 group-hover:translate-y-0">
                  <span className="block text-lg font-bold text-white">{item.common}</span>
                  <span className="block text-xs text-white/70">{item.binomial}</span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label={selected.common}
            className="fixed inset-0 z-[100] flex overflow-y-auto bg-ink/95 p-4 backdrop-blur-xl md:p-12"
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={selected.photo.url}
              onClick={(e) => e.stopPropagation()}
              className="m-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-3"
            >
              <div className="relative h-[55vh] overflow-hidden rounded-2xl border border-bone/10 bg-black/40 shadow-2xl md:h-[65vh] lg:col-span-2">
                <Image
                  src={selected.photo.url}
                  alt={selected.photo.text}
                  fill
                  priority
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-contain"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <p className="eyebrow mb-2 text-brass">Exquisite detail</p>
                  <h3 className="text-3xl font-bold md:text-4xl">{selected.common}</h3>
                  <p className="mt-2 font-serif text-xl italic text-bone/60">{selected.binomial}</p>
                </div>

                <div className="h-px w-full bg-bone/10" />

                <p className="leading-relaxed text-bone/60">{selected.photo.text}</p>

                <div className="flex items-center gap-3 text-sm text-bone/40">
                  <ExpandIcon />
                  <span className="eyebrow">High-resolution view</span>
                </div>
              </div>
            </motion.div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close gallery"
              className="fixed right-6 top-6 z-10 text-bone/50 transition-colors hover:text-bone md:right-8 md:top-8"
            >
              <CloseIcon width={36} height={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
