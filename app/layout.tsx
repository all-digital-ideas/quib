import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import Providers from "@/components/Providers";
import LoadingScreen from "@/components/LoadingScreen";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const grotesk = Hanken_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });
const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Premium Menswear for the Modern Gentleman`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} — Premium Menswear for the Modern Gentleman`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0e0e0d" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${grotesk.variable} ${display.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="" />
      </head>
      <body className="min-h-dvh bg-bone text-ink">
        <LoadingScreen />
        <Providers>{children}</Providers>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
