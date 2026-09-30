"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { cartSubtotal, clearCart, useStore } from "@/lib/store";
import { shippingFor } from "./CartView";

const PAYMENTS = [
  { id: "upi", label: "UPI", note: "Extra 5% off" },
  { id: "card", label: "Credit / Debit Card", note: "Visa, Mastercard, RuPay" },
  { id: "cod", label: "Cash on Delivery", note: "Pay when it arrives" },
];

function Field({ label, className = "", ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow mb-2 block text-[10px]">{label}</span>
      <input required className="field" {...props} />
    </label>
  );
}

export default function CheckoutForm() {
  const { cart } = useStore();
  const [payment, setPayment] = useState("upi");
  const [placed, setPlaced] = useState<string | null>(null);
  const subtotal = cartSubtotal(cart);
  const shipping = shippingFor(subtotal);
  const upiDiscount = payment === "upi" ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + shipping - upiDiscount;

  // TODO: hand the order to the commerce backend / payment gateway (Shopify
  // checkout, Razorpay…). Nothing is charged or submitted yet.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlaced(`QF${Date.now().toString().slice(-7)}`);
    clearCart();
    window.scrollTo({ top: 0 });
  };

  if (placed) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-xl py-16 text-center" role="status">
        <p className="eyebrow mb-5 text-brass">Order {placed}</p>
        <h1 className="display text-6xl md:text-8xl">
          Thank <em>you</em>
        </h1>
        <p className="mt-6 leading-relaxed text-graphite">
          Your order has been received. A confirmation with tracking details will follow by email and SMS.
        </p>
        <Link href="/" className="btn btn-dark mt-10">
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="display text-5xl md:text-7xl">Your bag is empty</h1>
        <Link href="/new-arrivals" className="btn btn-dark mt-10">
          Shop New Arrivals
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-12 lg:grid-cols-12">
      <div className="space-y-12 lg:col-span-7">
        <h1 className="display text-5xl md:text-7xl">Checkout</h1>

        <fieldset>
          <legend className="eyebrow mb-5 w-full border-b border-line pb-3">
            <span className="mr-3 text-brass">01</span>Contact
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" type="email" name="email" autoComplete="email" />
            <Field label="Mobile number" type="tel" name="phone" autoComplete="tel" inputMode="tel" pattern="[0-9+ ]{10,14}" />
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-5 w-full border-b border-line pb-3">
            <span className="mr-3 text-brass">02</span>Delivery
          </legend>
          <div className="grid gap-4 sm:grid-cols-6">
            <Field label="First name" name="firstName" autoComplete="given-name" className="sm:col-span-3" />
            <Field label="Last name" name="lastName" autoComplete="family-name" className="sm:col-span-3" />
            <Field label="Address" name="address" autoComplete="street-address" className="sm:col-span-6" />
            <Field label="City" name="city" autoComplete="address-level2" className="sm:col-span-2" />
            <Field label="State" name="state" autoComplete="address-level1" className="sm:col-span-2" />
            <Field label="PIN code" name="pin" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" className="sm:col-span-2" />
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-5 w-full border-b border-line pb-3">
            <span className="mr-3 text-brass">03</span>Payment
          </legend>
          <div className="space-y-2">
            {PAYMENTS.map((p) => (
              <label
                key={p.id}
                className={`flex min-h-14 cursor-pointer items-center gap-4 border px-4 transition-colors ${
                  payment === p.id ? "border-ink" : "border-line"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={p.id}
                  checked={payment === p.id}
                  onChange={() => setPayment(p.id)}
                  className="size-4 accent-ink"
                />
                <span className="flex-1 text-sm">{p.label}</span>
                <span className="text-xs text-stone">{p.note}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="bg-sand p-6 md:p-8 lg:sticky lg:top-8">
          <h2 className="eyebrow mb-6">Your order</h2>
          <ul className="space-y-4">
            {cart.map((l) => (
              <li key={l.key} className="flex gap-4">
                <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-bone">
                  <Image src={l.image} alt="" fill sizes="64px" className="object-cover object-top" />
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="line-clamp-2 leading-snug">{l.title}</p>
                  <p className="mt-1 text-xs text-stone">
                    Size {l.size} · Qty {l.qty}
                  </p>
                </div>
                <p className="text-sm">{formatPrice(l.price * l.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{shipping ? formatPrice(shipping) : "Free"}</dd>
            </div>
            {upiDiscount > 0 && (
              <div className="flex justify-between text-brass">
                <dt>UPI discount (5%)</dt>
                <dd>−{formatPrice(upiDiscount)}</dd>
              </div>
            )}
            <div className="flex items-baseline justify-between border-t border-line pt-4">
              <dt className="eyebrow">Total</dt>
              <dd className="font-serif text-3xl">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button type="submit" className="btn btn-dark mt-7 w-full">
            Place Order · {formatPrice(total)}
          </button>
          <p className="mt-4 text-center text-xs text-stone">7-day easy exchange on every order.</p>
        </div>
      </aside>
    </form>
  );
}
