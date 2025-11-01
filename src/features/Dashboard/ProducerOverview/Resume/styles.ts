/** @jsxImportSource @emotion/react */

import { theme } from "@/styles/theme";
import { css } from "@emotion/react";

const container = css`
  flex-direction: column;
  flex: 1;
`;

const title = {
  container: css`
    display: flex;
    gap: 0.5rem;
    align-item: center;
  `,
  text: css`
    font-size: 1.1rem;
    color: ${theme.colors.GRAY_DARK};
  `,
};

const text = {
  value: css`
    margin-top: 0.5rem;
    font-size: 4rem;
    color: ${theme.colors.BLACK};
  `,
  subtitle: css`
    font-size: 1rem;
    color: ${theme.colors.GRAY_DARK};
  `,
};

export { container, title, text };
