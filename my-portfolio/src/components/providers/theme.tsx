"use client";

import { ThemeProvider as NextThemes } from "next-themes";
import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
      {/* Turns off framer-motion transforms for people who prefer reduced motion */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemes>
  );
}
