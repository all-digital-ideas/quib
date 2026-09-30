import type { Metadata } from "next";
import { JournalCard } from "@/components/Journal";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/data/journal";
import { coverImage } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Journal",
  description: "Fabric guides, style notes and wardrobe advice from the Quib Fashion atelier.",
  alternates: { canonical: "/journal" },
  openGraph: { title: "The Quib Fashion Journal", url: "/journal" },
};

export default function JournalPage() {
  return (
    <>
      <PageHeader
        title="The Journal"
        description="Fabric guides, style notes and honest wardrobe advice."
        trail={[{ name: "Journal", path: "/journal" }]}
      />
      <ul className="shell grid gap-x-8 gap-y-16 pb-24 md:grid-cols-2 md:pb-32">
        {articles.map((a, i) => (
          <li key={a.slug} className={i % 2 ? "md:mt-24" : ""}>
            <Reveal>
              <JournalCard large entry={{ ...a, image: coverImage(a.cover) }} />
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}
