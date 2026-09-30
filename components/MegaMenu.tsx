"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { NavItem } from "@/lib/types";
import { EASE } from "./Providers";

export default function MegaMenu({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (!item.mega) return null;
  const rise = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <motion.div
      key={item.label}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="absolute inset-x-0 top-full border-b border-line bg-bone text-ink shadow-[0_30px_60px_-40px_rgb(14_14_13/0.35)]"
    >
      <motion.div
        className="shell grid grid-cols-12 gap-8 py-10"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.06, delayChildren: 0.05 }}
      >
        {item.mega.columns.map((col) => (
          <motion.div key={col.heading} variants={rise} className="col-span-2">
            <p className="eyebrow mb-5 text-stone">{col.heading}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={onNavigate} className="link-underline font-serif text-2xl leading-tight">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        <div className="col-span-8 col-start-6 grid grid-cols-2 gap-5 xl:col-span-6 xl:col-start-7">
          {item.mega.features.map((f) => (
            <motion.div key={f.href} variants={rise}>
              <Link href={f.href} onClick={onNavigate} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={f.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 22vw, 30vw"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-lux group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-3 flex items-center justify-between">
                  {f.label}
                  <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
