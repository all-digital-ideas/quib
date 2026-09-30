"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { formatPrice } from "@/lib/format";
import type { CardProduct } from "@/lib/types";
import { Reveal, StaggerText } from "./Reveal";

function Floating({ product, className, y }: { product: CardProduct; className: string; y: ReturnType<typeof useTransform<number, string>> }) {
  return (
    <motion.div style={{ y }} className={`absolute z-10 will-change-transform ${className}`}>
      <Link href={`/product/${product.slug}`} className="group block bg-bone p-2 shadow-[0_30px_60px_-30px_rgb(14_14_13/0.45)]">
        <div className="relative aspect-[3/4] overflow-hidden bg-sand">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 16vw, 34vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-lux group-hover:scale-105"
          />
        </div>
        <p className="mt-2 line-clamp-1 text-xs">{product.title}</p>
        <p className="text-xs text-stone">{formatPrice(product.price)}</p>
      </Link>
    </motion.div>
  );
}

export default function EditorialSection({ image, products }: { image: string; products: CardProduct[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const farY = useTransform(scrollYProgress, [0, 1], ["-10%", "12%"]);

  return (
    <section ref={ref} className="overflow-hidden bg-sand py-20 md:py-32">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6 lg:col-start-1">
          <div className="relative mx-auto aspect-[4/5] w-[78%] overflow-hidden lg:mx-0 lg:w-[82%]">
            <motion.div style={{ y: imageY }} className="absolute -inset-y-[8%] inset-x-0 will-change-transform">
              <Image src={image} alt="Quib Fashion editorial: the new gentleman" fill sizes="(min-width: 1024px) 42vw, 78vw" className="object-cover object-top" />
            </motion.div>
          </div>
          {products[0] && <Floating product={products[0]} y={nearY} className="right-0 top-[12%] w-[34%] lg:w-[30%]" />}
          {products[1] && <Floating product={products[1]} y={farY} className="bottom-[6%] left-0 w-[30%] lg:left-auto lg:right-[6%] lg:w-[26%]" />}
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-4 text-stone">
              <span className="h-px w-10 bg-brass" />
              The Editorial
            </p>
          </Reveal>
          <h2 className="display text-6xl uppercase md:text-8xl min-[1440px]:text-9xl">
            <StaggerText text={"The new\ngentleman"} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md font-serif text-2xl italic leading-snug text-graphite md:text-3xl">
              Contemporary silhouettes. Premium fabrics. Effortless confidence.
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-graphite">
              A wardrobe that does not raise its voice. Satin-finished cottons, considered embroidery and trousers cut to
              sit exactly where they should.
            </p>
            <Link href="/collection/premium" className="btn btn-dark mt-10">
              Discover the Lux Edit
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
