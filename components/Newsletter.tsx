"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "./Reveal";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  // TODO: post the address to the email platform of choice (Klaviyo, Mailchimp…).
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <section className="bg-sand py-20 md:py-28" aria-labelledby="newsletter">
      <Reveal className="shell grid gap-10 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="eyebrow mb-4 text-stone">Newsletter</p>
          <h2 id="newsletter" className="display text-6xl uppercase md:text-8xl">
            Join the
            <br />
            <em>inner circle</em>
          </h2>
        </div>
        <div className="lg:pb-3">
          <p className="mb-6 max-w-md leading-relaxed text-graphite">
            Get early access to new collections, exclusive drops and special offers.
          </p>
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.p
                key="done"
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-ink pb-4 font-serif text-2xl italic"
              >
                Welcome to the circle. Watch your inbox.
              </motion.p>
            ) : (
              <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={submit} className="flex max-w-xl border-b border-ink">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Your email address"
                  className="h-14 min-w-0 flex-1 bg-transparent text-base placeholder:text-stone focus:outline-none"
                />
                <button type="submit" className="eyebrow group flex shrink-0 items-center gap-2 pl-4">
                  Subscribe
                  <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
