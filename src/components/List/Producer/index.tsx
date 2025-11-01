/** @jsxImportSource @emotion/react */

"use client";

import { TextBody1 } from "@/components/Text/Body1";
import { OpenIcon } from "../shared/OpenIcon";
import * as stylesBase from "../shared/styles";
import { TextBody2 } from "@/components/Text/Body2";
import { ProducerProps } from "@/types/producer";
import { theme } from "@/styles/theme";
import { Tractor } from "lucide-react";

export interface ProducerItemProps {
  producer: ProducerProps;
  onClick?: () => void;
}

export function ProducerItem({ producer, onClick }: ProducerItemProps) {
  return (
    <div css={stylesBase.itemButton.container} onClick={onClick}>
      <div css={stylesBase.item.text.container}>
        <TextBody2>{producer.taxId}</TextBody2>
        <p  css={stylesBase.item.text.title}>{producer.name}</p>
      </div>

      <div css={stylesBase.item.info.container}>
        <Tractor size={24} color={theme.colors.SECONDARY} />
        <p  css={stylesBase.item.info.text}>{producer.farms?.length}</p>
      </div>
      <OpenIcon />
    </div>
  );
}
