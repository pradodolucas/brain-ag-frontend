/** @jsxImportSource @emotion/react */

"use client";

import { TextBody1 } from "@/components/Text/Body1";
import { OpenIcon } from "../shared/OpenIcon";
import * as stylesBase from "../shared/styles";
import { CropProps } from "@/types/crop";

export interface CropItemProps {
  crop: CropProps;
  onClick?: () => void;
}

export function CropItem({ crop, onClick }: CropItemProps) {
  return (
    <div css={stylesBase.itemButton.container} onClick={onClick}>
      <div></div>
      <div css={stylesBase.item.text.container}>
        <p css={stylesBase.item.text.title}>{crop.food}</p>
      </div>
      <OpenIcon />
    </div>
  );
}
