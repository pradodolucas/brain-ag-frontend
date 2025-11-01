/** @jsxImportSource @emotion/react */
"use client";

import { theme } from "@/styles/theme";
import * as styles from "./styles";

export interface TextBody2Props {
  children: React.ReactNode;
  color?: string;
}

export function TextBody2({
  children,
  color = theme.colors.GRAY_DARK,
}: TextBody2Props) {
  return <p css={styles.text(color)}>{children}</p>;
}
