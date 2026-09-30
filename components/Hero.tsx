"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { ArrowIcon } from "./Icons";
import { EASE } from "./Providers";
import { StaggerText } from "./Reveal";

type Props = {
  image: string;
  product: { title: string; slug: string; price: number };
};

export default function Hero({ image, product }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section ref={ref} className="relative -mt-[100px] h-svh min-h-[620px] overflow-hidden bg-coal text-bone">
      {/* Image plate: full-bleed on mobile, right-hand plate on desktop. */}
      <div className="absolute inset-0 overflow-hidden lg:left-[44%]">
        <motion.div style={{ y: imageY }} className="absolute inset-0 will-change-transform">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.14 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: EASE }}
          >
            <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover object-[50%_18%]" />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/35 to-coal/30 lg:bg-gradient-to-r lg:from-coal lg:via-coal/10 lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-coal/60 to-transparent" />
      </div>

      <motion.div style={{ y: textY, opacity: fade }} className="shell relative z-10 flex h-full flex-col justify-end pb-12 md:pb-16 lg:pb-20">
        <motion.p {...reveal(0.5)} className="eyebrow mb-5 flex items-center gap-4 text-bone/70 md:mb-8">
          <span className="h-px w-10 bg-brass" />
          {site.season}
        </motion.p>

        <h1 className="display text-[clamp(3.6rem,15vw,5.5rem)] uppercase md:text-[clamp(5.5rem,11.5vw,12.5rem)]">
          <StaggerText text={"Dress like\nyou mean it."} onView={false} delay={0.55} />
        </h1>

        <div className="mt-7 flex flex-col gap-7 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p {...reveal(1)} className="max-w-sm text-base leading-relaxed text-bone/75 md:text-lg">
            {site.tagline}
          </motion.p>
          <motion.div {...reveal(1.15)} className="flex flex-col gap-3 sm:flex-row">
            <Link href="/new-arrivals" className="btn btn-light group">
              Shop New Collection
              <ArrowIcon width={16} height={16} className="transition-transform duration-500 ease-lux group-hover:translate-x-1" />
            </Link>
            <Link href="/collection/best-sellers" className="btn btn-outline-light">
              Explore Best Sellers
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div {...reveal(1.5)} className="absolute right-10 top-36 z-10 hidden text-right lg:block min-[1440px]:right-16">
        <Link href={`/product/${product.slug}`} className="group block">
          <p className="eyebrow text-[10px] text-bone/60">Featured</p>
          <p className="mt-1 ml-auto max-w-[15rem] font-serif text-lg leading-tight">{product.title}</p>
          <p className="mt-1 text-sm text-bone/70">{formatPrice(product.price)}</p>
        </Link>
      </motion.div>
    </section>
  );
}
