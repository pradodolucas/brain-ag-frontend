/** @jsxImportSource @emotion/react */

"use client";

import { ReactNode } from "react";
import * as stylesBase from "./shared/styles";

interface ListProps {
  children: ReactNode;
}

function List({ children }: ListProps) {
  return (
    <div css={stylesBase.container} role="list">
      {children}
    </div>
  );
}

export { List };
export { ProducerItem } from "./Producer";
export { FarmItem } from "./Farm";
export { CropItem } from "./Crop";
export { CropGroupItem } from "./CropGroup";
