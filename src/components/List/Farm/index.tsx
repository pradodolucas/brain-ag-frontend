/** @jsxImportSource @emotion/react */

"use client";

import { TextBody1 } from "@/components/Text/Body1";
import { OpenIcon } from "../shared/OpenIcon";
import * as stylesBase from "../shared/styles";
import { TextBody2 } from "@/components/Text/Body2";
import { ProducerProps } from "@/types/producer";
import { FarmProps } from "@/types/farm";
import { MapPin } from "lucide-react";
import { theme } from "@/styles/theme";

export interface FarmItemProps {
  farm: FarmProps;
  producer?: ProducerProps | null;
  onClick?: () => void;
}

export function FarmItem({ farm, producer = null, onClick }: FarmItemProps) {
  return (
    <div css={stylesBase.itemButton.container} onClick={onClick}>
      <div></div>
      <div css={stylesBase.item.text.container}>
        <p css={stylesBase.item.text.title}>{farm.name}</p>
      </div>
      <div css={stylesBase.item.info.container}>
        <MapPin size={16} color={theme.colors.GRAY} />
        <TextBody2>{`${farm.city} / ${farm.state}`}</TextBody2>
      </div>
      <OpenIcon />
    </div>
  );
}
