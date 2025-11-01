/** @jsxImportSource @emotion/react */

"use client";

import * as styles from "./styles";

export interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "primaryOutline"
    | "secondary"
    | "secondaryOutline"
    | "dangerOutline"
    | "default";
  type?: "submit" | "button";
  onClick?: () => void;
  loading?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
}

export function Button({
  children,
  variant = "default",
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  size = "md",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      css={[styles.btn, styles.sizeStyles[size], styles.variants[variant]]}
      disabled={loading || disabled}
    >
      {loading ? "LOAD" : children}
    </button>
  );
}
