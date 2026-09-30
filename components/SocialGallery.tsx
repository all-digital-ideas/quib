import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

export default function SocialGallery({ images }: { images: { src: string; alt: string }[] }) {
  const instagram = site.social[0];
  return (
    <section className="border-t border-line py-20 md:py-28" aria-labelledby="social">
      <Reveal className="shell mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3 text-stone">Worn by you</p>
          <h2 id="social" className="display text-5xl md:text-7xl">
            <em>{instagram.handle}</em>
          </h2>
        </div>
        <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline self-start md:self-auto">
          Follow on Instagram
        </a>
      </Reveal>
      <ul className="grid grid-cols-3 gap-1 md:grid-cols-6 md:gap-2 md:px-2">
        {images.map((img, i) => (
          <li key={img.src} className={i % 2 ? "md:mt-10" : ""}>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${img.alt} on Instagram`}
              className="group relative block aspect-[4/5] overflow-hidden bg-sand"
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(min-width: 768px) 17vw, 34vw"
                className="object-cover object-top transition-transform duration-[1.4s] ease-lux group-hover:scale-105"
              />
              <span className="eyebrow absolute inset-0 grid place-items-center bg-ink/45 text-[10px] text-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                View post
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
