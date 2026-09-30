import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/journal";
import { Reveal } from "./Reveal";

export type JournalEntry = Pick<Article, "slug" | "title" | "category" | "excerpt" | "readTime"> & { image: string };

export function JournalCard({ entry, large = false }: { entry: JournalEntry; large?: boolean }) {
  return (
    <Link href={`/journal/${entry.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-sand ${large ? "aspect-[4/5] lg:aspect-[5/6]" : "aspect-[4/5]"}`}>
        <Image
          src={entry.image}
          alt=""
          fill
          sizes={large ? "(min-width: 1024px) 48vw, 100vw" : "(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 100vw"}
          className="object-cover object-top transition-transform duration-[1.6s] ease-lux group-hover:scale-105"
        />
      </div>
      <p className="eyebrow mt-5 flex gap-3 text-[10px] text-stone">
        <span className="text-brass">{entry.category}</span>
        {entry.readTime}
      </p>
      <h3 className={`mt-3 font-serif leading-[1.05] ${large ? "text-3xl md:text-5xl" : "text-2xl"}`}>
        <span className="link-underline group-hover:bg-[length:100%_1px]">{entry.title}</span>
      </h3>
      {large && <p className="mt-4 max-w-lg leading-relaxed text-graphite">{entry.excerpt}</p>}
    </Link>
  );
}

export default function Journal({ entries }: { entries: JournalEntry[] }) {
  const [lead, ...rest] = entries;
  return (
    <section className="shell py-20 md:py-32" aria-labelledby="journal">
      <Reveal className="mb-10 flex items-end justify-between md:mb-14">
        <div>
          <p className="eyebrow mb-3 text-stone">Notes on dressing well</p>
          <h2 id="journal" className="display text-5xl md:text-7xl">
            The <em>Journal</em>
          </h2>
        </div>
        <Link href="/journal" className="eyebrow group flex items-center gap-2 border-b border-ink pb-1.5">
          All Stories
          <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
        </Link>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <JournalCard entry={lead} large />
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-2 lg:content-start">
          {rest.map((e, i) => (
            <Reveal key={e.slug} delay={0.08 * (i + 1)} className={i === 2 ? "lg:hidden" : ""}>
              <JournalCard entry={e} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
