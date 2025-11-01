import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px; /* 1rem = 16px */
  }

  body {
    background-color: #f7f9fc;
    color: #1a1a1a;
    font-family: var(--font-nunito), sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
