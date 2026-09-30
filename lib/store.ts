"use client";

// Cart, wishlist and recently-viewed state. A tiny external store persisted to
// localStorage; components subscribe with useStore().
import { useSyncExternalStore } from "react";
import type { CardProduct, CartLine } from "./types";

type State = { cart: CartLine[]; wishlist: CardProduct[]; recent: CardProduct[] };

const KEY = "quib.store.v1";
const EMPTY: State = { cart: [], wishlist: [], recent: [] };
const listeners = new Set<() => void>();
let state = EMPTY;
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved) state = { ...EMPTY, ...JSON.parse(saved) };
  } catch {
    // Storage unavailable or corrupt: start empty.
  }
}

function set(next: State) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Persisting is best-effort.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => EMPTY;

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function addToCart(product: CardProduct, size: string, qty = 1) {
  load();
  const key = `${product.slug}::${size}`;
  const existing = state.cart.find((l) => l.key === key);
  const cart = existing
    ? state.cart.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 10) } : l))
    : [
        ...state.cart,
        {
          key,
          slug: product.slug,
          title: product.title,
          image: product.image,
          price: product.price,
          compareAt: product.compareAt,
          size,
          color: product.color,
          qty,
        },
      ];
  set({ ...state, cart });
}

export function setQty(key: string, qty: number) {
  set({
    ...state,
    cart: qty < 1 ? state.cart.filter((l) => l.key !== key) : state.cart.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 10) } : l)),
  });
}

export const removeLine = (key: string) => setQty(key, 0);

export const clearCart = () => set({ ...state, cart: [] });

export function toggleWishlist(product: CardProduct) {
  load();
  const has = state.wishlist.some((p) => p.slug === product.slug);
  set({ ...state, wishlist: has ? state.wishlist.filter((p) => p.slug !== product.slug) : [product, ...state.wishlist] });
}

export function pushRecent(product: CardProduct) {
  load();
  if (state.recent[0]?.slug === product.slug) return;
  set({ ...state, recent: [product, ...state.recent.filter((p) => p.slug !== product.slug)].slice(0, 12) });
}

export const cartCount = (cart: CartLine[]) => cart.reduce((n, l) => n + l.qty, 0);
export const cartSubtotal = (cart: CartLine[]) => cart.reduce((n, l) => n + l.qty * l.price, 0);
export const firstAvailableSize = (p: CardProduct) => p.sizes.find((s) => s.available)?.label ?? null;
