/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

import * as stylesBase from "../shared/styles";

const select = css`
  ${stylesBase.input.base}

  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
  padding-right: 2.5rem;
  cursor: pointer;

  &:disabled {
    background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23999' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
    cursor: not-allowed;
  }

  option {
    color: ${theme.colors.BLACK};
    background-color: white;
  }

  option:disabled {
    color: ${theme.colors.GRAY_LIGHT};
  }
`;


export { select };
