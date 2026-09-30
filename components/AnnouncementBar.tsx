import { site } from "@/lib/site";

export default function AnnouncementBar() {
  // The list is rendered twice so the -50% marquee loop is seamless.
  const run = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {site.announcements.map((text) => (
        <li key={text} className="eyebrow flex items-center whitespace-nowrap text-[10px]">
          <span className="px-6">{text}</span>
          <span aria-hidden className="size-[3px] rounded-full bg-brass" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="flex h-9 items-center overflow-hidden bg-ink text-bone" role="region" aria-label="Offers">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {run(false)}
        {run(true)}
        {run(true)}
        {run(true)}
      </div>
    </div>
  );
}
