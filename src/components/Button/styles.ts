/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

const btn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  font-weight: 600;
  color: ${theme.colors.WHITE};
  background-color: transparent;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const sizeStyles = {
  xs: css`
    height: 2rem;
    font-size: 0.75rem;
    padding: 0 0.5rem;
    border-radius: 0.35rem;
  `,
  sm: css`
    height: 2.2rem;
    font-size: 0.875rem;
    padding: 0 1rem;
    border-radius: 0.55rem;
  `,
  md: css`
    height: 2.6rem;
    font-size: 1.05rem;
    padding: 0 1.3rem;
    border-radius: 0.75rem;
  `,
  lg: css`
    height: 2.8rem;
    font-size: 1.125rem;
    padding: 0 1.75rem;
    border-radius: 0.95rem;
  `,
};

const variants = {
  primary: css`
    background-color: ${theme.colors.PRIMARY};
    color: ${theme.colors.WHITE};

    &:hover {
      background-color: ${theme.colors.PRIMARY_DARK};
    }

    &:active {
      background-color: ${theme.colors.PRIMARY_LIGHT};
    }
  `,
  primaryOutline: css`
    background-color: transparent;
    color: ${theme.colors.PRIMARY};
    border: 2px solid ${theme.colors.PRIMARY};

    &:hover {
      background-color: ${theme.colors.PRIMARY};
      color: ${theme.colors.WHITE};
    }

    &:active {
      background-color: ${theme.colors.PRIMARY_LIGHT};
      border-color: ${theme.colors.PRIMARY_LIGHT};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.SECONDARY};
    color: ${theme.colors.WHITE};

    &:hover {
      background-color: ${theme.colors.SECONDARY_DARK};
    }

    &:active {
      background-color: ${theme.colors.SECONDARY_DARK};
    }
  `,
  secondaryOutline: css`
    background-color: transparent;
    color: ${theme.colors.SECONDARY};
    border: 2px solid ${theme.colors.SECONDARY};

    &:hover {
      background-color: ${theme.colors.SECONDARY};
      color: ${theme.colors.WHITE};
    }

    &:active {
      background-color: ${theme.colors.SECONDARY_LIGHT};
      border-color: ${theme.colors.SECONDARY_LIGHT};
    }
  `,
  dangerOutline: css`
    background-color: transparent;
    color: ${theme.colors.DANGER};
    border: 2px solid ${theme.colors.DANGER};

    &:hover {
      background-color: ${theme.colors.DANGER};
      color: ${theme.colors.WHITE};
    }

    &:active {
      background-color: ${theme.colors.DANGER_LIGHT};
      border-color: ${theme.colors.DANGER_LIGHT};
    }
  `,
  default: css`
    background-color: ${theme.colors.GRAY_LIGHT_2X};
    color: ${theme.colors.GRAY_DARK};

    &:hover {
      background-color: ${theme.colors.GRAY_LIGHT};
    }

    &:active {
      background-color: ${theme.colors.GRAY_LIGHT};
    }
  `,
};

export { btn, sizeStyles, variants };
