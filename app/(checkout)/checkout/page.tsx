import type { Metadata } from "next";
import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Checkout",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

// Deliberately outside the (store) layout: no navigation, marquee or footer.
export default function CheckoutPage() {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-line">
        <div className="shell flex h-16 items-center justify-between">
          <Link href="/cart" className="eyebrow link-underline text-[10px]">
            ← Back to bag
          </Link>
          <Link href="/" className="display whitespace-nowrap text-xl uppercase tracking-[0.14em] sm:text-[1.75rem]">
            {site.name}
          </Link>
          <p className="eyebrow text-[10px] text-stone">Secure checkout</p>
        </div>
      </header>
      <main className="shell py-10 md:py-16">
        <CheckoutForm />
      </main>
    </div>
  );
}
