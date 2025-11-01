/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

const container = css`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  gap: 1rem;
  border: 1px solid ${theme.colors.GRAY_LIGHT};
  padding: ${theme.sizes.PADDING};
`;

const title = {
  container: css`
    display: flex;
    gap: 0.5rem;
    height: 2.5rem;
    align-items: center;
  `,

  text: css`
    font-size: 1.15rem;
    font-weight: 600;
    color: ${theme.colors.GRAY_DARK};
  `,

  actions: css`
    margin-left: auto;
  `,
};

export const styles = {
  container,
  title,
};
