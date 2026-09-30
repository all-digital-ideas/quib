import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getHelpPage, helpPages } from "@/data/help";

export const dynamicParams = false;

export function generateStaticParams() {
  return helpPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/help/[slug]">): Promise<Metadata> {
  const page = getHelpPage((await params).slug);
  if (!page) return {};
  return { title: page.title, description: page.intro, alternates: { canonical: `/help/${page.slug}` } };
}

export default async function HelpPage({ params }: PageProps<"/help/[slug]">) {
  const page = getHelpPage((await params).slug);
  if (!page) notFound();
  return (
    <>
      <PageHeader title={page.title} description={page.intro} trail={[{ name: page.title, path: `/help/${page.slug}` }]} />
      <div className="shell grid gap-12 pb-24 md:pb-32 lg:grid-cols-12">
        <nav aria-label="Help topics" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col">
            {helpPages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/help/${p.slug}`}
                  aria-current={p.slug === page.slug ? "page" : undefined}
                  className={`eyebrow link-underline ${p.slug === page.slug ? "" : "text-stone"}`}
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-7">
          {page.sections.map((s) => (
            <section key={s.heading} className="border-t border-line py-8">
              <h2 className="mb-3 font-serif text-3xl">{s.heading}</h2>
              <p className="text-lg leading-relaxed text-graphite">{s.text}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
