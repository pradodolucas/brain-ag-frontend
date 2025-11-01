/** @jsxImportSource @emotion/react */

"use client";

import { Panel } from "@/components/Panel";
import * as styles from "./styles";
import { useCrops } from "@/hooks/useCrops";
import ChartStates from "./ChartStates";
import ChartCultures from "./ChartCultures";
import {
  groupCropsByState,
  groupCropsByType,
} from "@/libs/data/extractor/cropMetrics";
import { useProducers } from "@/hooks/useProducers";

interface CropsAnalyticProps {}

export function CropsAnalytic({}: CropsAnalyticProps) {
  const { crops, loading: loadingCrop } = useCrops();
  const { data: producers, loading: loadingProducer } = useProducers();

  return (
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
  );
}
