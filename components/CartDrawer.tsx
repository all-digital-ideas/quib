"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { addToCart, cartCount, cartSubtotal, firstAvailableSize, removeLine, setQty, useStore } from "@/lib/store";
import type { CardProduct, CartLine } from "@/lib/types";
import { CloseIcon, MinusIcon, PlusIcon } from "./Icons";
import { EASE, useUi } from "./Providers";

export function ShippingProgress({ subtotal }: { subtotal: number }) {
  const left = Math.max(site.freeShippingThreshold - subtotal, 0);
  const pct = Math.min(subtotal / site.freeShippingThreshold, 1) * 100;
  return (
    <div>
      <p className="text-sm" role="status">
        {left > 0 ? (
          <>
            <strong className="font-semibold">{formatPrice(left)}</strong> away from <span className="eyebrow">Free Shipping</span>
          </>
        ) : (
          <>
            You have unlocked <span className="eyebrow">Free Shipping</span>
          </>
        )}
      </p>
      <div className="mt-2.5 h-0.5 overflow-hidden bg-line">
        <motion.div className="h-full bg-ink" animate={{ width: `${pct}%` }} initial={false} />
      </div>
    </div>
  );
}

export function QuantityStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex h-9 items-center border border-line" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" aria-label="Decrease quantity" className="grid h-full w-9 place-items-center" onClick={() => onChange(value - 1)}>
        <MinusIcon width={14} height={14} />
      </button>
      <span className="w-7 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" aria-label="Increase quantity" className="grid h-full w-9 place-items-center" onClick={() => onChange(value + 1)}>
        <PlusIcon width={14} height={14} />
      </button>
    </div>
  );
}

export function CartLineItem({ line, onNavigate }: { line: CartLine; onNavigate?: () => void }) {
  return (
    <div className="flex gap-4">
      <Link href={`/product/${line.slug}`} onClick={onNavigate} className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-sand">
        <Image src={line.image} alt="" fill sizes="96px" className="object-cover object-top" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <Link href={`/product/${line.slug}`} onClick={onNavigate} className="line-clamp-2 text-sm leading-snug">
            {line.title}
          </Link>
          <p className="shrink-0 text-sm font-medium">{formatPrice(line.price * line.qty)}</p>
        </div>
        <p className="mt-1 text-xs text-stone">
          {[line.color, `Size ${line.size}`].filter(Boolean).join(" · ")}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper value={line.qty} onChange={(n) => setQty(line.key, n)} label={line.title} />
          <button type="button" onClick={() => removeLine(line.key)} className="eyebrow link-underline text-[10px] text-stone">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer({ recommended }: { recommended: CardProduct[] }) {
  const { cartOpen, closeCart } = useUi();
  const { cart } = useStore();
  const subtotal = cartSubtotal(cart);
  const suggestions = recommended.filter((r) => !cart.some((l) => l.slug === r.slug)).slice(0, 4);

  useEffect(() => {
    if (!cartOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, closeCart]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={closeCart} />
          <motion.aside
            role="dialog"
            aria-modal
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-bone"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
              <h2 className="eyebrow">
                Your Bag <span className="text-stone">({cartCount(cart)})</span>
              </h2>
              <button type="button" onClick={closeCart} aria-label="Close bag" className="-mr-2 grid size-10 place-items-center">
                <CloseIcon />
              </button>
            </div>

            {cart.length > 0 && (
              <div className="border-b border-line px-6 py-4">
                <ShippingProgress subtotal={subtotal} />
              </div>
            )}

            <div className="flex-1 overflow-y-auto overscroll-contain px-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <p className="display text-4xl">Your bag is empty</p>
                  <p className="mt-3 text-sm text-stone">The good pieces do not stay in stock for long.</p>
                  <Link href="/new-arrivals" onClick={closeCart} className="btn btn-dark mt-8">
                    Shop New Arrivals
                  </Link>
                </div>
              ) : (
                <ul>
                  <AnimatePresence initial={false}>
                    {cart.map((line) => (
                      <motion.li
                        key={line.key}
                        layout
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden border-b border-line"
                      >
                        <div className="py-5">
                          <CartLineItem line={line} onNavigate={closeCart} />
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}

              {suggestions.length > 0 && (
                <div className="py-7">
                  <p className="eyebrow mb-4 text-stone">Pairs well with</p>
                  <ul className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6">
                    {suggestions.map((p) => {
                      const size = firstAvailableSize(p);
                      return (
                        <li key={p.slug} className="w-32 shrink-0">
                          <Link href={`/product/${p.slug}`} onClick={closeCart} className="relative block aspect-[3/4] overflow-hidden bg-sand">
                            <Image src={p.image} alt="" fill sizes="128px" className="object-cover object-top" />
                          </Link>
                          <p className="mt-2 line-clamp-1 text-xs">{p.title}</p>
                          <p className="text-xs text-stone">{formatPrice(p.price)}</p>
                          {size && (
                            <button type="button" onClick={() => addToCart(p, size)} className="eyebrow link-underline mt-1.5 text-[10px]">
                              + Add · {size}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="shrink-0 border-t border-line px-6 pb-6 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">Subtotal</span>
                  <span className="font-serif text-2xl">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-stone">Taxes included. Shipping calculated at checkout.</p>
                <Link href="/checkout" onClick={closeCart} className="btn btn-dark mt-5 w-full">
                  Checkout
                </Link>
                <Link href="/cart" onClick={closeCart} className="eyebrow link-underline mx-auto mt-4 block w-fit text-[10px]">
                  View full bag
                </Link>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
