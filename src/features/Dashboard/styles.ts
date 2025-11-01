/** @jsxImportSource @emotion/react */

import { theme } from "@/styles/theme";
import { css } from "@emotion/react";

const dashboard = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
};

const stats = {
  container: css`
    display: flex;
    gap: 1rem;
    height: 15rem;
  `,
  resume: {
    container: css`
      flex: 1;
      display: flex;
      flex-direction: column;
    `,
    items: {
      container: css`
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
      `,
    },
  },
  area: {
    container: css`
      width: 400px;
    `,
  },
};

export { dashboard, stats };
