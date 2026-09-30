"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cartCount, useStore } from "@/lib/store";
import type { NavItem } from "@/lib/types";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "./Icons";
import MegaMenu from "./MegaMenu";
import { EASE, useUi } from "./Providers";

function Count({ n }: { n: number }) {
  if (!n) return null;
  return (
    <motion.span
      key={n}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
      className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-brass text-[9px] font-semibold text-bone"
    >
      {n}
    </motion.span>
  );
}

export default function Header({ nav, children }: { nav: NavItem[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const { openCart } = useUi();
  const { cart, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Over the homepage hero the bar is transparent; everywhere else it is solid.
  const solid = scrolled || mega !== null || pathname !== "/";
  const active = nav.find((n) => n.label === mega);
  const icon = "relative grid size-10 place-items-center transition-opacity hover:opacity-60";

  return (
    <>
      <header
        onMouseLeave={() => setMega(null)}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-lux ${scrolled ? "-translate-y-9" : ""}`}
      >
        {children}
        <div
          className={`relative border-b transition-[background-color,color,border-color] duration-500 ${
            solid ? "border-line bg-bone/85 text-ink backdrop-blur-xl" : "border-transparent text-bone"
          }`}
        >
          <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:grid-cols-[auto_1fr_auto] lg:gap-10">
            <button
              type="button"
              className={`${icon} -ml-2 lg:hidden`}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </button>

            <Link href="/" className="display whitespace-nowrap text-xl uppercase tracking-[0.14em] sm:text-[1.75rem]" aria-label={`${site.name} home`}>
              {site.name}
            </Link>

            <nav aria-label="Primary" className="hidden h-full justify-center lg:flex">
              <ul className="flex h-full items-stretch gap-7 xl:gap-9">
                {nav.map((item) => (
                  <li key={item.label} className="flex" onMouseEnter={() => setMega(item.mega ? item.label : null)}>
                    <Link
                      href={item.href}
                      onClick={() => setMega(null)}
                      onFocus={() => setMega(item.mega ? item.label : null)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`eyebrow relative flex items-center ${item.accent ? "text-brass" : ""}`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-lux ${
                          mega === item.label || pathname === item.href ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="-mr-2 flex items-center justify-end">
              <Link href="/search" className={icon} aria-label="Search">
                <SearchIcon />
              </Link>
              <Link href="/account" className={`${icon} hidden sm:grid`} aria-label="Account">
                <UserIcon />
              </Link>
              <Link href="/wishlist" className={`${icon} hidden sm:grid`} aria-label={`Wishlist, ${wishlist.length} items`}>
                <HeartIcon />
                <Count n={wishlist.length} />
              </Link>
              <button type="button" className={icon} aria-label={`Cart, ${cartCount(cart)} items`} onClick={openCart}>
                <BagIcon />
                <Count n={cartCount(cart)} />
              </button>
            </div>
          </div>

          <AnimatePresence>{active && <MegaMenu item={active} onNavigate={() => setMega(null)} />}</AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileOpen(false)} />
            <motion.div
              role="dialog"
              aria-modal
              aria-label="Menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-y-0 left-0 flex w-[min(88vw,420px)] flex-col overflow-y-auto bg-bone px-6 pb-8"
            >
              <div className="flex h-16 shrink-0 items-center justify-between">
                <span className="display text-2xl uppercase tracking-[0.14em]">{site.name}</span>
                <button type="button" className={`${icon} -mr-2`} aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                  <CloseIcon />
                </button>
              </div>
              <motion.ul
                className="mt-4 border-t border-line"
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.05, delayChildren: 0.15 }}
              >
                {nav.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex min-h-14 items-center justify-between font-serif text-3xl ${item.accent ? "text-brass" : ""}`}
                    >
                      {item.label}
                      <span className="text-base">→</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <ul className="mt-8 space-y-4">
                {[
                  ["Wishlist", "/wishlist"],
                  ["Account", "/account"],
                  ["Journal", "/journal"],
                  ["About", "/about"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} onClick={() => setMobileOpen(false)} className="eyebrow block py-1">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-10 text-sm text-stone">{site.contact.hours}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
