/** @jsxImportSource @emotion/react */

"use client";

import { Dashboard } from "@/templates/Dashboard";
import { ProducerOverview } from "@/features/Dashboard/ProducerOverview";
import { CropsAnalytic } from "@/features/Dashboard/CropsAnalytic";

export default function Home() {
  return (
    <>
      <Dashboard title={"Visão geral"} menuActive={'/'}>
        <ProducerOverview />
        <CropsAnalytic />
    
      </Dashboard>
    </>
  );
}
