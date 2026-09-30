import type { Metadata } from "next";
import { WishlistView } from "@/components/CartView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Wishlist",
  alternates: { canonical: "/wishlist" },
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader title="Wishlist" description="The pieces you have your eye on." trail={[{ name: "Wishlist", path: "/wishlist" }]} />
      <div className="shell pb-24 md:pb-32">
        <WishlistView />
      </div>
    </>
  );
}
