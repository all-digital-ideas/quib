import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Your Bag",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader title="Your Bag" trail={[{ name: "Bag", path: "/cart" }]} />
      <div className="shell pb-24 md:pb-32">
        <CartView />
      </div>
    </>
  );
}
