import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./Icons";
import { Reveal } from "./Reveal";

export type StyleCard = { label: string; note: string; href: string; image: string };

export default function StyleCategories({ styles }: { styles: StyleCard[] }) {
  return (
    <section className="shell py-20 md:py-28" aria-labelledby="shop-by-style">
      <Reveal className="mb-10 flex items-end justify-between md:mb-14">
        <div>
          <p className="eyebrow mb-3 text-stone">Find your register</p>
          <h2 id="shop-by-style" className="display text-5xl md:text-7xl">
            Shop by <em>Style</em>
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm leading-relaxed text-graphite md:block">
          Six ways to wear the season, from the first meeting of the day to the last table of the night.
        </p>
      </Reveal>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {styles.map((s, i) => (
          <li key={s.label} className={i % 3 === 1 ? "md:mt-14" : ""}>
            <Reveal delay={(i % 3) * 0.08}>
              <Link href={s.href} className="group relative block aspect-[3/4] overflow-hidden bg-coal text-bone">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 32vw, 48vw"
                  className="object-cover object-top transition-transform duration-[1.6s] ease-lux group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent transition-colors duration-700 group-hover:bg-ink/35" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-7">
                  <div className="overflow-hidden">
                    <p className="eyebrow mb-2 text-[10px] text-bone/70 transition-transform duration-700 ease-lux md:translate-y-8 md:group-hover:translate-y-0">
                      {s.note}
                    </p>
                    <h3 className="display text-3xl uppercase transition-transform duration-700 ease-lux md:text-6xl md:group-hover:-translate-y-1">
                      {s.label}
                    </h3>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-bone/50 transition-[background-color,color,transform] duration-500 ease-lux group-hover:-rotate-45 group-hover:bg-bone group-hover:text-ink md:size-12">
                    <ArrowIcon width={16} height={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
