/** @jsxImportSource @emotion/react */

"use client";

import { Panel } from "@/components/Panel";
import { useProducers } from "@/hooks/useProducers";

import * as ProducerMetrics from "@/libs/data/extractor/producerMetrics";
import * as FarmMetrics from "@/libs/data/extractor/farmMetrics";

import { ResumeItem } from "@/features/Dashboard/ProducerOverview/Resume";
import * as styles from "@/features/Dashboard/styles";
import ChartAreaDivider from "./ChartAreaDivider";

import { Grid2x2, Tractor, Users } from "lucide-react";
import { theme } from "@/styles/theme";

interface ProducerOverviewProps {
  title?: string;
}

export function ProducerOverview({
  title = "Visão geral",
}: ProducerOverviewProps) {
  const { data: producers, loading, fetching } = useProducers();

  console.log({ producers, loading });
  if (loading || !producers) {
    return <p>Carregando...</p>;
  }

  const res = FarmMetrics.getCultivableVsVegetationPercentage(producers);

  return (
    <div css={styles.dashboard.container}>
      <div css={styles.stats.container}>
        <Panel _css={styles.stats.resume.container} title={"Resumo geral"}>
          <div css={styles.stats.resume.items.container}>
            <ResumeItem
              icon={<Grid2x2  color={theme.colors.GRAY} size={20}/>}
              title="Área total"
              value={String(FarmMetrics.getTotalArea(producers))}
              subtitle="hectares registrados"
            />

            <ResumeItem
              icon={<Tractor color={theme.colors.GRAY} size={20} />}
              title="Fazendas"
              value={String(ProducerMetrics.getTotalFarms(producers))}
              subtitle="Ver detalhes"
            />

            <ResumeItem
              icon={<Users color={theme.colors.GRAY} size={20} />}
              title="Agricultores"
              value={String(ProducerMetrics.getTotalProducers(producers))}
              subtitle="Ver detalhes"
            />
          </div>
        </Panel>

        <Panel
          title={"Distribuição da área"}
          _css={styles.stats.area.container}
        >
          <>
            <ChartAreaDivider
              data={[
                {
                  name: "Área de cultivo",
                  value: FarmMetrics.getTotalCultivableArea(producers),
                },
                {
                  name: "Área de vegetação",
                  value: FarmMetrics.getTotalVegetationArea(producers),
                },
              ]}
            />
            {/* <p>{res.cultivablePercentage}</p>
            <p>{res.vegetationPercentage}</p> */}
          </>
        </Panel>
      </div>
    </div>
  );
}
