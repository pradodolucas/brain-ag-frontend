/** @jsxImportSource @emotion/react */

import { theme } from "@/styles/theme";
import { css } from "@emotion/react";

const container = css`
  margin-left: auto;
  width: 3rem;
`;

const icon = {
  container: css`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export { container, icon };
