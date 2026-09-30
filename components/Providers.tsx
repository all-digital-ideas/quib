"use client";

import { MotionConfig } from "motion/react";
import { createContext, useContext, useMemo, useState } from "react";

type Ui = { cartOpen: boolean; openCart: () => void; closeCart: () => void };

const UiContext = createContext<Ui>({ cartOpen: false, openCart: () => {}, closeCart: () => {} });

export const useUi = () => useContext(UiContext);

export const EASE = [0.22, 1, 0.36, 1] as const;

export default function Providers({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const ui = useMemo(
    () => ({ cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false) }),
    [cartOpen],
  );
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
      <UiContext.Provider value={ui}>{children}</UiContext.Provider>
    </MotionConfig>
  );
}
