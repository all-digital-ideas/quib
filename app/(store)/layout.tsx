import AnnouncementBar from "@/components/AnnouncementBar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCards, getNav } from "@/lib/catalog";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="btn btn-dark sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90]">
        Skip to content
      </a>
      <Header nav={getNav()}>
        <AnnouncementBar />
      </Header>
      {/* Offset for the fixed announcement bar (36px) + navigation (64px). */}
      <main id="main" className="pt-[100px]">
        {children}
      </main>
      <Footer />
      <CartDrawer recommended={getCards("best-sellers", 8)} />
    </>
  );
}
