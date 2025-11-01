/** @jsxImportSource @emotion/react */

import { theme } from "@/styles/theme";
import { css } from "@emotion/react";



const container = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const panel = {
  container: css`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,

  chart: css`
    height: 300px;
  `,
};

export { container, panel };
