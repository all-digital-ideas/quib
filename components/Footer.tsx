import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export default function Footer() {
  const a = site.contact.address;
  return (
    <footer className="bg-ink text-bone">
      <div className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="display text-4xl uppercase tracking-[0.14em]">{site.name}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/60">{site.tagline} Designed and made in Surat, India.</p>
          <address className="mt-8 space-y-1 text-sm not-italic text-bone/60">
            <p>
              <a href={`mailto:${site.contact.email}`} className="link-underline text-bone">
                {site.contact.email}
              </a>
            </p>
            <p>
              <a href={site.contact.whatsapp} className="link-underline text-bone" target="_blank" rel="noopener noreferrer">
                {site.contact.phone}
              </a>
            </p>
            <p className="pt-2">{site.contact.hours}</p>
            <p>
              {a.street}, {a.city}, {a.region} {a.postalCode}
            </p>
          </address>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {footerNav.map((group) => (
            <div key={group.heading}>
              <p className="eyebrow mb-5 text-bone/50">{group.heading}</p>
              <ul className="space-y-3 text-sm">
                {group.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("http") ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="link-underline">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-bone/15">
        <div className="shell flex flex-col gap-4 py-6 text-xs text-bone/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="eyebrow link-underline text-[10px] text-bone">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>COD · UPI · Cards · Net Banking</p>
        </div>
      </div>
    </footer>
  );
}
