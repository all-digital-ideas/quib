"use client";

import { motion } from "motion/react";
import { EASE } from "./Providers";

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline that rises line by line from behind a mask. Lines are split on "\n". */
export function StaggerText({
  text,
  className,
  delay = 0,
  onView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  onView?: boolean;
}) {
  const lines = text.split("\n");
  const animate = { y: "0%" };
  return (
    <span className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            {...(onView ? { whileInView: animate, viewport: { once: true, margin: "0px 0px -10% 0px" } } : { animate })}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
