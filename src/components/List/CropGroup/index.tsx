/** @jsxImportSource @emotion/react */

"use client";

import { TextBody1 } from "@/components/Text/Body1";
import { OpenIcon } from "../shared/OpenIcon";
import * as stylesBase from "../shared/styles";
import { TextBody2 } from "@/components/Text/Body2";
import { CropGroupProps } from "@/types/crop";
import { Sprout } from "lucide-react";
import { theme } from "@/styles/theme";

export interface CropGroupItemProps {
  cropGroup: CropGroupProps;
  onClick?: () => void;
}

export function CropGroupItem({ cropGroup, onClick }: CropGroupItemProps) {
  return (
    <div css={stylesBase.itemButton.container} onClick={onClick}>
      <div></div>
      <div css={stylesBase.item.text.container}>
        <p css={stylesBase.item.text.title}>{cropGroup.year}</p>
      </div>
      <div css={stylesBase.item.info.container}>
        <Sprout size={24} color={theme.colors.SECONDARY} />
        <p css={stylesBase.item.info.text}>
          {cropGroup.crops.length + " culturas"}
        </p>
      </div>

      <OpenIcon />
    </div>
  );
}
