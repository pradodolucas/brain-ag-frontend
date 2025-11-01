/** @jsxImportSource @emotion/react */

"use client";

import { theme } from "@/styles/theme";
import * as styles from "./styles";

import { ChevronRight } from "lucide-react";

export interface ProducerItemProps {}

export function OpenIcon() {
  return (
    <div css={styles.container}>
      <div css={styles.icon.container}>
        <ChevronRight color={theme.colors.PRIMARY} size={24} />
      </div>
    </div>
  );
}
