"use client";

import { ProducerProps } from "@/types/producer";
import { useEffect, useRef, useState } from "react";

import { useRouter, useParams } from "next/navigation";
import { callApi } from "@/libs/utils/webservice";
import { Panel } from "@/components/Panel";
import { Dashboard } from "@/templates";
import { Button } from "@/components/Button";
import { FarmModal } from "../../shared/components/FarmModal";
import { ModalRef } from "@/components/Modal";
import { FarmItem, List } from "@/components/List";
import { FarmProps } from "@/types/farm";
import { ProducerFormModal } from "@/app/shared/components/ProducerFormModal";

export default function ProducerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const modalFarmFormRef = useRef<ModalRef>(null);
  const modalEditProducerRef = useRef<ModalRef>(null);

  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [producer, setProducer] = useState<ProducerProps | null>(null);
  const [farmSelect, setFarmSelect] = useState<FarmProps | null>(null);

  const load = async () => {
    const res = await callApi(`producer/${id}`, {}, "GET");

    if (res.success) {
      setPageLoading(false);
      setProducer(res.data as ProducerProps);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const farmForm = (farmSelect: FarmProps | null) => {
    setFarmSelect(farmSelect);
    modalFarmFormRef.current?.open();
  };

  if (!pageLoading && !producer) {
    router.push("/404");

    return;
  }

  if (pageLoading) {
    return (
      <Dashboard title="Carregando">
        <div>Carregando detalhes do produtor...</div>
      </Dashboard>
    );
  }

  const onFinishModal = (reference: string | null) => {
    if (reference == "farm" || reference == "farm_drop") {
      modalFarmFormRef.current?.close(true);
    }
    if ("producer_drop" == reference) {
      router.replace("/producer");
      return;
    }

    load();
  };

  if (!producer) {
    return null;
  }

  return (
    <>
      <Dashboard
        title={producer.name}
        subtitle={producer.taxId}
        menuActive={'/producer'}
        titleAction={
          <Button
            variant="secondaryOutline"
            size="sm"
            onClick={() => modalEditProducerRef.current?.open()}
          >
            Editar produtor
          </Button>
        }
      >
        <Panel
          title={"Fazendas"}
          actions={
            <>
              <Button variant="primary" onClick={() => farmForm(null)}>
                Nova fazenda 
              </Button>
            </>
          }
        >
          {producer.farms && producer.farms.length > 0 ? (
            <List>
              {producer.farms.map((farm, i) => (
                <FarmItem
                  key={i}
                  farm={farm}
                  onClick={() => {
                    router.push(`/farm/${farm.id}`);
                  }}
                />
              ))}
            </List>
          ) : (
            <p>Nenhuma fazenda cadastrada.</p>
          )}
        </Panel>
      </Dashboard>
      <FarmModal
        ref={modalFarmFormRef}
        producerId={producer.id}
        farm={farmSelect}
        onFinish={() => {
          modalFarmFormRef.current?.close(true);
          load();
        }}
      />

      <ProducerFormModal
        ref={modalEditProducerRef}
        producer={producer}
        onFinish={onFinishModal}
      />
    </>
  );
}
