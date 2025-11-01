/** @jsxImportSource @emotion/react */

import { theme } from "@/styles/theme";
import { css } from "@emotion/react";

const modalStyles = css`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  background: white;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  justify-content: flex-end;
  align-items: stretch;
`;

const header = {
  container: css`
    padding: ${theme.sizes.PADDING};
    border-bottom: 1px solid ${theme.colors.GRAY_LIGHT};
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: ${theme.sizes.HEADER_HEIGHT};
  `,

  text: css`
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.GRAY_DARK};
  `,

  close: css`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.25rem;
    line-height: 1;
    color: ${theme.colors.GRAY};
    &:hover {
      color: ${theme.colors.GRAY_DARK};
    }
  `,

  actions: {
    container: css`
      margin-left: auto;
    `,
  },
};

const body = {
  container: css`
    padding: ${theme.sizes.PADDING};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: ${theme.sizes.HEADER_HEIGHT};
  `,
};

const footer = {
  container: css`
    padding: ${theme.sizes.PADDING};
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: auto;
  `,
};

export { overlayStyles, modalStyles, header, body, footer };
