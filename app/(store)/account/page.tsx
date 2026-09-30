import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account",
  alternates: { canonical: "/account" },
  robots: { index: false },
};

// Placeholder until customer accounts are connected to the commerce backend.
export default function AccountPage() {
  const links = [
    { label: "Track an order", href: site.trackingUrl, note: "Live status from our courier partner" },
    { label: "Your wishlist", href: "/wishlist", note: "Pieces you have saved on this device" },
    { label: "Exchange & returns", href: "/help/exchange", note: "Within 7 days of delivery" },
    { label: "Contact support", href: "/contact", note: site.contact.hours },
  ];
  return (
    <>
      <PageHeader
        title="Account"
        description="Customer accounts are opening soon. In the meantime, everything you need is here."
        trail={[{ name: "Account", path: "/account" }]}
      />
      <ul className="shell grid gap-px pb-24 sm:grid-cols-2 md:pb-32">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex h-full items-end justify-between border border-line p-6 transition-colors duration-500 hover:bg-ink hover:text-bone md:p-10">
              <span>
                <span className="block font-serif text-3xl">{l.label}</span>
                <span className="mt-2 block text-sm opacity-60">{l.note}</span>
              </span>
              <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
