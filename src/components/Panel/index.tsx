/** @jsxImportSource @emotion/react */

import { styles } from "./styles";
import { SerializedStyles } from "@emotion/react";

export interface PanelProps {
  children: React.ReactNode;
  title?: string | null;
  actions?: React.ReactNode;
  _css?: SerializedStyles | null;
}

export function Panel({
  children,
  title = null,
  actions = null,
  _css = null,
}: PanelProps) {
  return (
    <div css={[styles.container, _css]}>
      {title && (
        <div css={styles.title.container}>
          <p css={styles.title.text}>{title}</p>

          {actions && <div css={styles.title.actions}>{actions}</div>}
        </div>
      )}

      {children}
    </div>
  );
}
