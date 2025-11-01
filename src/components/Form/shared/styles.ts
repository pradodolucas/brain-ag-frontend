/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

const input = {
  base: css`
    font-size: 1rem;
    line-height: 1;
    padding: 0.7rem 1rem;
    width: 100%;
    min-height: 2.5rem;
    border: 1px solid ${theme.colors.GRAY_LIGHT};
    border-radius: 0.5rem;
    outline-color: ${theme.colors.PRIMARY};
    background-color: transparent;
    color: ${theme.colors.GRAY_DARK};
    transition: 0.3s;

    &::placeholder {
      color: ${theme.colors.GRAY_LIGHT};
    }

    &:focus {
      color: ${theme.colors.BLACK};
    }

    &:disabled {
      background-color: ${theme.colors.GRAY_LIGHT_2X};
      border-color: ${theme.colors.GRAY_LIGHT_2X};
      color: ${theme.colors.GRAY_DARK};
      cursor: not-allowed;
    }

    &:invalid {
      border-color: #ff3333;
    }
  `,

  container: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    margin: 0.5rem 0;
  `,

  label: css`
    font-size: 0.95rem;
    font-weight: 600;
    color: ${theme.colors.GRAY_DARK};
    display: block;
  `,

  error: {
    text: css`
      font-size: 0.9rem;
      line-height: 1;
      color: red;
    `,
  },
};

export { input };
