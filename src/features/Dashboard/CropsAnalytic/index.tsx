/** @jsxImportSource @emotion/react */

"use client";

import { Panel } from "@/components/Panel";
import { useCrops } from "@/hooks/useCrops";
import ChartStates from "./ChartStates";
import ChartCultures from "./ChartCultures";
import {
  groupCropsByState,
  groupCropsByType,
} from "@/libs/data/extractor/cropMetrics";
import { useProducers } from "@/hooks/useProducers";
import { Sprout } from "lucide-react";
import { theme } from "@/styles/theme";


import * as styles from "./styles";

import * as stylesBase from "../styles";

interface CropsAnalyticProps {}

export function CropsAnalytic({}: CropsAnalyticProps) {
  const { crops, loading: loadingCrop } = useCrops();
  const { data: producers, loading: loadingProducer } = useProducers();

  return (
    <>
      <div css={stylesBase.header.container}>
        <Sprout size={28} color={theme.colors.PRIMARY} />
        <p css={stylesBase.header.title}>Cultivos</p>
        <p css={stylesBase.header.interval}>Últimos 3 anos</p>
      </div>
      <div css={styles.container}>
        <Panel _css={styles.panel.container} title={"Produção por Estado"}>
          <div css={styles.panel.chart}>
            {loadingCrop || loadingProducer ? (
              <p>Carregando...</p>
            ) : (
              <ChartStates data={groupCropsByState(crops, producers)} />
            )}
          </div>
        </Panel>

        <Panel _css={styles.panel.container} title={"Composição da Safra"}>
          <div css={styles.panel.chart}>
            {loadingCrop || loadingProducer ? (
              <p>Carregando...</p>
            ) : (
              <ChartCultures data={groupCropsByType(crops)} />
            )}
          </div>
        </Panel>
      </div>
    </>
  );
}
