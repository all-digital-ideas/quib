"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Size } from "@/lib/types";
import { CloseIcon } from "./Icons";
import { EASE } from "./Providers";

// Indicative body measurements in inches. Replace with the brand's own chart.
const GUIDES = {
  top: {
    columns: ["Size", "Chest", "Shoulder", "Length"],
    rows: [
      ["S", "38", "17", "27.5"],
      ["M", "40", "17.5", "28.5"],
      ["L", "42", "18.5", "29"],
      ["XL", "44", "19", "29.5"],
      ["XXL", "46", "20", "30"],
      ["3XL", "48", "20.5", "30.5"],
      ["4XL", "50", "21", "31"],
    ],
  },
  bottom: {
    columns: ["Size", "Waist", "Hip", "Length"],
    rows: [
      ["28", "28", "36", "39"],
      ["30", "30", "38", "39.5"],
      ["32", "32", "40", "40"],
      ["34", "34", "42", "40.5"],
      ["36", "36", "44", "41"],
      ["38", "38", "46", "41"],
    ],
  },
};

function SizeGuide({ kind, onClose }: { kind: keyof typeof GUIDES; onClose: () => void }) {
  const guide = GUIDES[kind];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-end sm:place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal
        aria-label="Size guide"
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 40 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative w-full max-w-lg bg-bone p-6 sm:p-10"
      >
        <button type="button" onClick={onClose} aria-label="Close size guide" className="absolute right-3 top-3 grid size-10 place-items-center">
          <CloseIcon />
        </button>
        <h3 className="display text-4xl">Size Guide</h3>
        <p className="mt-2 text-sm text-stone">Measurements in inches. Between sizes? Take the larger one.</p>
        <table className="mt-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink">
              {guide.columns.map((c) => (
                <th key={c} className="eyebrow py-3 text-[10px] font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guide.rows.map((r) => (
              <tr key={r[0]} className="border-b border-line">
                {r.map((cell, i) => (
                  <td key={i} className={`py-3 tabular-nums ${i === 0 ? "font-medium" : "text-graphite"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

export default function SizeSelector({
  sizes,
  value,
  onChange,
  kind,
  error,
}: {
  sizes: Size[];
  value: string | null;
  onChange: (size: string) => void;
  kind: "top" | "bottom";
  error?: boolean;
}) {
  const [guide, setGuide] = useState(false);
  return (
    <div id="size-selector">
      <div className="mb-3 flex items-center justify-between">
        <p className="eyebrow">
          Size {value && <span className="ml-2 text-stone">{value}</span>}
          {error && !value && <span className="ml-2 normal-case tracking-normal text-[#a3262a]">Please select a size</span>}
        </p>
        <button type="button" onClick={() => setGuide(true)} className="eyebrow link-underline text-[10px] text-stone">
          Size guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
        {sizes.map((s) => (
          <button
            key={s.label}
            type="button"
            role="radio"
            aria-checked={value === s.label}
            disabled={!s.available}
            onClick={() => onChange(s.label)}
            className={`h-12 min-w-14 border px-3 text-sm transition-colors duration-300 ${
              value === s.label
                ? "border-ink bg-ink text-bone"
                : "border-line enabled:hover:border-ink disabled:text-stone/50 disabled:line-through"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <AnimatePresence>{guide && <SizeGuide kind={kind} onClose={() => setGuide(false)} />}</AnimatePresence>
    </div>
  );
}
