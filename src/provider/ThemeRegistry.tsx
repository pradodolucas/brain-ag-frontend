"use client";

import { ThemeProvider, Global } from "@emotion/react";

import { theme } from "@/styles/theme";
import { globalStyles } from "@/styles/global";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
}
