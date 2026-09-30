"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import type { ProductImage } from "@/lib/types";

export default function ProductGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [slide, setSlide] = useState(0);
  const stage = useRef<HTMLDivElement>(null);

  // Zoom follows the cursor by moving the transform origin; no re-render per move.
  const track = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--zx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--zy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div>
      {/* Touch: swipeable rail */}
      <div className="relative lg:hidden">
        <ul
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(e) => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        >
          {images.map((img, i) => (
            <li key={img.src} className="relative aspect-[3/4] w-full shrink-0 snap-center bg-sand">
              <Image
                src={img.src}
                alt={`${title}, view ${i + 1}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-top"
              />
            </li>
          ))}
        </ul>
        <p className="absolute bottom-3 right-3 bg-bone/90 px-2.5 py-1 text-[11px] tabular-nums">
          {slide + 1} / {images.length}
        </p>
      </div>

      {/* Pointer: thumbnail rail + zoomable stage */}
      <div className="hidden gap-4 lg:flex">
        <ul className="no-scrollbar flex max-h-[78vh] w-20 shrink-0 flex-col gap-3 overflow-y-auto xl:w-24">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                aria-label={`Show view ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                onMouseEnter={() => setIndex(i)}
                className={`relative block aspect-[3/4] w-full overflow-hidden bg-sand transition-opacity duration-300 ${
                  i === index ? "opacity-100 outline outline-1 outline-offset-2 outline-ink" : "opacity-55 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>

        <div
          ref={stage}
          onMouseMove={track}
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          className="relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden bg-sand"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={images[index].src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={images[index].src}
                alt={`${title}, view ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 60vw, 100vw"
                style={{ transformOrigin: "var(--zx, 50%) var(--zy, 50%)" }}
                className={`object-cover object-top transition-transform duration-500 ease-lux ${zoomed ? "scale-[2]" : ""}`}
              />
            </motion.div>
          </AnimatePresence>
          <p className="eyebrow pointer-events-none absolute bottom-4 left-4 bg-bone/90 px-2.5 py-1.5 text-[10px]">
            {zoomed ? "Move to explore" : "Hover to zoom"}
          </p>
        </div>
      </div>
    </div>
  );
}
