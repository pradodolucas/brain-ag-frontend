/** @jsxImportSource @emotion/react */

import { theme } from "@/styles/theme";
import { css } from "@emotion/react";

const container = css`
  margin-left: -${theme.sizes.PADDING};
  margin-right: -${theme.sizes.PADDING};
`;

const item = {
  container: css`
    padding: 0.75rem ${theme.sizes.PADDING};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,

  text: {
    container: css`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex:1;
    `,
    title: css`
      font-size: 1rem;
      font-weight: 600;
      color: ${theme.colors.BLACK}
    `,
  },

  info: {
    container: css`
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      flex:1;
    `,

    text: css`
      font-size: 1.2rem;
      font-weight: bold;
      color: ${theme.colors.GRAY_DARK}
    `,
  }
};

const itemButton = {
  container: css`
    ${item.container}

    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: ${theme.colors.GRAY_LIGHT_2X};
    }
  `,
};

export { container, item, itemButton };
