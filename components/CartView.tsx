"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { cartSubtotal, useStore } from "@/lib/store";
import { CartLineItem, ShippingProgress } from "./CartDrawer";
import ProductGrid from "./ProductGrid";

export const shippingFor = (subtotal: number) => (subtotal >= site.freeShippingThreshold || subtotal === 0 ? 0 : site.shippingFee);

export function CartView() {
  const { cart } = useStore();
  const subtotal = cartSubtotal(cart);
  const shipping = shippingFor(subtotal);

  if (!cart.length) {
    return (
      <div className="border-y border-line py-20 text-center">
        <p className="display text-4xl md:text-5xl">Your bag is empty</p>
        <Link href="/new-arrivals" className="btn btn-dark mt-8">
          Shop New Arrivals
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="border-t border-line lg:col-span-7">
        {cart.map((line) => (
          <li key={line.key} className="border-b border-line py-6">
            <CartLineItem line={line} />
          </li>
        ))}
      </ul>
      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="bg-sand p-6 md:p-8 lg:sticky lg:top-24">
          <h2 className="eyebrow mb-6">Order Summary</h2>
          <ShippingProgress subtotal={subtotal} />
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{shipping ? formatPrice(shipping) : "Free"}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-4">
              <dt className="eyebrow">Total</dt>
              <dd className="font-serif text-3xl">{formatPrice(subtotal + shipping)}</dd>
            </div>
          </dl>
          <Link href="/checkout" className="btn btn-dark mt-7 w-full">
            Proceed to Checkout
          </Link>
          <p className="mt-4 text-center text-xs text-stone">COD, UPI, cards and net banking accepted.</p>
        </div>
      </aside>
    </div>
  );
}

export function WishlistView() {
  const { wishlist } = useStore();
  if (!wishlist.length) {
    return (
      <div className="border-y border-line py-20 text-center">
        <p className="display text-4xl md:text-5xl">Nothing saved yet</p>
        <p className="mt-3 text-sm text-stone">Tap the heart on any piece to keep it here.</p>
        <Link href="/shop" className="btn btn-dark mt-8">
          Explore the Collection
        </Link>
      </div>
    );
  }
  return <ProductGrid products={wishlist} sortable={false} />;
}
