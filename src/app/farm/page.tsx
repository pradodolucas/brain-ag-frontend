"use client";

import { useEffect, useRef, useState } from "react";

import { ProducerProps } from "@/types/producer";
import { callApi } from "@/libs/utils/webservice";

import { Dashboard } from "@/templates";
import { Button } from "@/components/Button";
import { Panel } from "@/components/Panel";
import type { ModalRef } from "@/components/Modal";
import { FarmItem, List, ProducerItem } from "@/components/List";

import { FarmModal } from "../shared/components/FarmModal";

import { useRouter } from "next/navigation";
import { useProducers } from "@/hooks/useProducers";
import { FarmProps } from "@/types/farm";

export default function ProducerPage() {
  const router = useRouter();
  const { data: producers, loading, refetch } = useProducers();

  const modalRef = useRef<ModalRef>(null);
  const [farms, setFarms] = useState<FarmProps[]>([]);

  const load = async () => {
    refetch(true);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (producers.length > 0) extractFarms();
  }, [producers]);

  const handleOpen = () => modalRef.current?.open();

  const extractFarms = async () => {
    const farms: FarmProps[] = [];

    for (const producer of producers) {
      producer.farms?.forEach((farm) => farms.push(farm));
    }

    setFarms(farms);
  };

  const onFinishModal = () => {
    modalRef.current?.close(true);
    load();
  }

  return (
    <Dashboard title="Fazendas" subtitle="Gerencie os locais de cultivo">
      <Panel
        title="Cadastro de fazendas"
        actions={
          <Button variant="primary" onClick={handleOpen}>
            Adicionar
          </Button>
        }
      >
        {loading ? (
          <div>
            <p>Carregando agricultores...</p>
          </div>
        ) : (
          <List>
            {farms.length > 0 ? (
              farms.map((farm, i) => (
                <FarmItem
                  key={farm.id}
                  farm={farm}
                  onClick={() => router.push(`/farm/${farm.id}`)}
                />
              ))
            ) : (
              <div>
                <p>Nenhuma fazenda cadastrada</p>
              </div>
            )}
          </List>
        )}
      </Panel>

      <FarmModal ref={modalRef} producers={producers} onFinish={onFinishModal} />
    </Dashboard>
  );
}
