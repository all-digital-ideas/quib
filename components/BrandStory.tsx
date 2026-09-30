import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal, StaggerText } from "./Reveal";

export default function BrandStory({ image, cta = true }: { image: string; cta?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-coal text-bone" aria-labelledby="brand-story">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[46%]">
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover object-top opacity-35 lg:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/40 to-transparent max-lg:hidden" />
      </div>

      <div className="shell relative py-24 md:py-36">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-4 text-bone/60">
            <span className="h-px w-10 bg-brass" />
            Our Story · Surat, India
          </p>
        </Reveal>
        <h2 id="brand-story" className="display max-w-[14ch] text-[clamp(3rem,9vw,9rem)] uppercase">
          <StaggerText text={"Built for men\nwho don't follow\nthe crowd."} />
        </h2>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <Reveal className="space-y-5 lg:col-span-5" delay={0.15}>
            {site.story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed text-bone/75 md:text-lg">
                {p}
              </p>
            ))}
            {cta && (
              <Link href="/about" className="btn btn-outline-light !mt-9">
                Read Our Story
              </Link>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-bone/20 pt-8 md:grid-cols-4 lg:max-w-[52%]">
            {site.story.facts.map((f) => (
              <div key={f.label}>
                <dd className="display text-4xl md:text-5xl">{f.value}</dd>
                <dt className="eyebrow mt-2 text-[10px] text-bone/60">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
