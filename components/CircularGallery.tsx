"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";

interface CircularGalleryProps {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
  onItemClick?: (item: GalleryItem) => void;
  className?: string;
}

/**
 * A 3D ring of cards that turns with page scroll and idles in a slow
 * auto-rotation while the reader is still. Rotation is measured against the
 * nearest `[data-gallery-scroll]` ancestor so the ring completes exactly one
 * turn over that block, wherever the section sits on the page.
 */
export function CircularGallery({
  items,
  className,
  radius = 600,
  autoRotateSpeed = 0.02,
  onItemClick,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = containerRef.current?.closest("[data-gallery-scroll]");
      if (!wrapper) return;
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const top = window.scrollY + wrapper.getBoundingClientRect().top;
      const travel = wrapper.getBoundingClientRect().height - window.innerHeight;
      const progress = travel > 0 ? (window.scrollY - top) / travel : 0;
      setRotation(Math.min(1, Math.max(0, progress)) * 360);

      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const autoRotate = () => {
      if (!isScrolling) setRotation((prev) => prev + autoRotateSpeed);
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };
    animationFrameRef.current = requestAnimationFrame(autoRotate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isScrolling, autoRotateSpeed]);

  if (!items.length) return null;

  const anglePerItem = 360 / items.length;
  const facing = ((rotation % 360) + 360) % 360;

  return (
    <div
      ref={containerRef}
      className={`relative flex h-full w-full items-center justify-center ${className ?? ""}`}
      style={{ perspective: "2000px" }}
    >
      <div
        className="relative h-full w-full"
        style={{ transform: `rotateY(${rotation}deg)`, transformStyle: "preserve-3d" }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem;
          const relativeAngle = (itemAngle + facing + 360) % 360;
          const normalized = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
          const opacity = Math.max(0.3, 1 - normalized / 180);

          return (
            <button
              key={item.photo.url}
              type="button"
              aria-label={`View ${item.common}`}
              onClick={() => onItemClick?.(item)}
              className="absolute h-[400px] w-[300px] cursor-pointer"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                left: "50%",
                top: "50%",
                marginLeft: "-150px",
                marginTop: "-200px",
                opacity,
                transition: "opacity 0.3s linear",
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg border border-bone/10 bg-coal shadow-2xl">
                <Image
                  src={item.photo.url}
                  alt={item.photo.text}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-left text-bone">
                  <h3 className="text-xl font-bold">{item.common}</h3>
                  <p className="mt-1 text-xs opacity-70">{item.binomial}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
