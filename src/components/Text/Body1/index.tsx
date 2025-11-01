/** @jsxImportSource @emotion/react */
"use client";

import { theme } from "@/styles/theme";
import * as styles from "./styles";

export interface TextBody1Props {
  children: React.ReactNode;
  color?: string;
}

export function TextBody1({
  children,
  color = theme.colors.GRAY_DARK,
}: TextBody1Props) {
  return <p css={styles.text(color)}>{children}</p>;
}
