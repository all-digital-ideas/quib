import { site } from "@/lib/site";

// A brief brand veil on first paint. It is pure CSS, so it clears on its own
// schedule and never waits on hydration.
export default function LoadingScreen() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] flex animate-veil items-center justify-center bg-ink text-bone motion-reduce:hidden"
    >
      <span className="display animate-veil-mark text-3xl uppercase md:text-5xl">{site.name}</span>
    </div>
  );
}
