import Link from "next/link";
import { site } from "@/lib/site";

export default function CategoryMarquee() {
  const run = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {site.marquee.map((c, i) => (
        <li key={c.href} className="flex items-center">
          <Link
            href={c.href}
            tabIndex={hidden ? -1 : undefined}
            className={`display whitespace-nowrap px-6 text-5xl uppercase transition-colors duration-500 hover:text-brass md:px-10 md:text-7xl ${
              i % 2 ? "italic text-stone" : ""
            }`}
          >
            {c.label}
          </Link>
          <span aria-hidden className="text-xl text-brass">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <nav aria-label="Categories" className="overflow-hidden border-b border-line py-7 md:py-10">
      <div className="flex w-max animate-marquee [--marquee-duration:55s] hover:[animation-play-state:paused]">
        {run(false)}
        {run(true)}
      </div>
    </nav>
  );
}
