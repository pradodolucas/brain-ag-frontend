/** @jsxImportSource @emotion/react */

import { theme } from "@/styles/theme";
import { css } from "@emotion/react";

const text = (color: string) => css`
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  color: ${color};
`;

export { text };
