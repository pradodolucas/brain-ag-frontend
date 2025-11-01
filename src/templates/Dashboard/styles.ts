/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

const container = css`
  display: flex;
  height: 100%;
  min-height: 100vh;
`;

const sidebar = {
  container: css`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${theme.colors.GRAY_LIGHT};
    width: 250px;
  `,
  header: css`
    display: flex;
    height: ${theme.sizes.HEADER_HEIGHT};
    justify-content: center;
    align-items: center;
  `,
  menu: {
    container: css`
      display: flex;
      flex-direction: column;
    `,

    category: {
      container: css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      `,
      text: css`
        font-size: 0.85rem;
        letter-spacing: 0.2px;
        color: ${theme.colors.GRAY};
        font-weight: 600;
        text-transform: uppercase;
        margin: 0.5rem 0;

        padding: 0 ${theme.sizes.PADDING};
      `,
    },

    item: {
      container: css`
        height: 3.5rem;
        background-color: transparent;

        padding: 0 ${theme.sizes.PADDING};

        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.2s;
        gap: 1rem;

        &:hover {
          background-color: ${theme.colors.GRAY_LIGHT_2X};
        }
      `,
      text: css`
        font-size: 1rem;
        color: ${theme.colors.GRAY_DARK};
        font-weight: 600;
      `,
      active: css`
        background-color: ${theme.colors.GRAY_LIGHT_2X} !important;

        p {
          color: ${theme.colors.PRIMARY} !important;
        }
      `,
    },
  },
};

const content = {
  page: css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  header: css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 ${theme.sizes.PADDING};
    height: ${theme.sizes.HEADER_HEIGHT};
    min-height: ${theme.sizes.HEADER_HEIGHT};
    border-bottom: 1px solid ${theme.colors.GRAY_LIGHT};
  `,

  subheader: {
    container: css`
      display: flex;
      align-items: center;
    `,
    text: {
      container: css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      `,
    },
    actions: {
      container: css`
        margin-left: auto;
      `,
    },
  },

  main: css`
    padding: ${theme.sizes.PADDING};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  `,

  title: css`
    font-size: 1.75rem;
    color: ${theme.colors.BLACK};
  `,

  subtitle: css`
    font-size: 1rem;
    color: ${theme.colors.GRAY};
  `,
};

export const styles = {
  container,
  sidebar,
  content,
};
