import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to ${site.name} on WhatsApp or email. ${site.contact.hours}.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact ${site.name}`, url: "/contact" },
};

export default function ContactPage() {
  const { contact } = site;
  const a = contact.address;
  const channels = [
    { label: "Customer support", value: contact.email, href: `mailto:${contact.email}` },
    { label: "WhatsApp & phone", value: contact.phone, href: contact.whatsapp },
    { label: "Business enquiries", value: contact.business, href: `mailto:${contact.business}` },
    { label: "Track an order", value: "Open order tracking", href: site.trackingUrl },
  ];
  return (
    <>
      <PageHeader
        title="Get in touch"
        description="Questions about sizing, an order or an exchange? We answer every message personally."
        trail={[{ name: "Contact", path: "/contact" }]}
      />
      <div className="shell grid gap-14 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <dl className="border-t border-line">
            {channels.map((c) => (
              <div key={c.label} className="border-b border-line py-6">
                <dt className="eyebrow mb-2 text-stone">{c.label}</dt>
                <dd>
                  <a href={c.href} className="link-underline font-serif text-2xl md:text-3xl">
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          <address className="mt-8 text-sm not-italic leading-relaxed text-graphite">
            <p className="eyebrow mb-2 text-stone">Studio</p>
            {site.legalName}
            <br />
            {a.street}
            <br />
            {a.city}, {a.region} {a.postalCode}, India
            <p className="mt-4">{contact.hours}</p>
          </address>
        </div>

        {/* Opens the visitor's mail client; swap for an API route when a helpdesk is connected. */}
        <form
          action={`mailto:${contact.email}`}
          method="post"
          encType="text/plain"
          className="space-y-4 bg-sand p-6 md:p-10 lg:col-span-6 lg:col-start-7"
        >
          <h2 className="display mb-6 text-4xl">Send a message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow mb-2 block text-[10px]">Name</span>
              <input name="name" required autoComplete="name" className="field bg-bone" />
            </label>
            <label className="block">
              <span className="eyebrow mb-2 block text-[10px]">Order number (optional)</span>
              <input name="order" className="field bg-bone" />
            </label>
          </div>
          <label className="block">
            <span className="eyebrow mb-2 block text-[10px]">Message</span>
            <textarea name="message" required rows={6} className="field bg-bone" />
          </label>
          <button type="submit" className="btn btn-dark">
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}
