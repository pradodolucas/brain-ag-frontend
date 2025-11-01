/** @jsxImportSource @emotion/react */

import { theme } from "@/styles/theme";
import { css } from "@emotion/react";

const header = {
  container: css`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    margin-top: 1rem;
    align-items: end;
  `,
  title: css`
  font-size: 1.2rem;
  color: ${theme.colors.GRAY_DARK}
  font-weigth: 600;
`,
  interval: css`
    font-size: 1rem;
    color: ${theme.colors.GRAY};
  `,
};

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
      gap:1rem;
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

export { header, dashboard, stats };
