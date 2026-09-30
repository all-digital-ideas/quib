import Link from "next/link";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full = [{ name: "Home", path: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-stone">
        {full.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i < full.length - 1 ? (
              <>
                <Link href={c.path} className="link-underline">
                  {c.name}
                </Link>
                <span aria-hidden>/</span>
              </>
            ) : (
              <span aria-current="page" className="line-clamp-1 text-ink">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbSchema(full)} />
    </nav>
  );
}

export default function PageHeader({
  title,
  description,
  trail,
  children,
}: {
  title: string;
  description?: string;
  trail: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <header className="shell pb-10 pt-8 md:pb-14 md:pt-12">
      <Breadcrumbs trail={trail} />
      <h1 className="display mt-8 text-6xl md:text-8xl">{title}</h1>
      {description && <p className="mt-5 max-w-xl leading-relaxed text-graphite md:text-lg">{description}</p>}
      {children}
    </header>
  );
}
