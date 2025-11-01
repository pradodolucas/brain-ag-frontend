"use client";

import { ThemeRegistry } from "./ThemeRegistry";
import ReduxProvider from "./ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeRegistry>{children}</ThemeRegistry>
    </ReduxProvider>
  );
}
