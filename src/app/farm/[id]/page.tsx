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
import { CropGroupItem, CropItem, FarmItem, List } from "@/components/List";
import { FarmProps } from "@/types/farm";
import { CropProps, CropGroupProps } from "@/types/crop";
import { CropFormModal } from "@/app/shared/components/CropFormModal";
import { CropGroupModal } from "@/app/shared/components/CropGroupModal";

export default function ProducerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const modalFarmFormRef = useRef<ModalRef>(null);
  const modalCropFormRef = useRef<ModalRef>(null);
  const modalCropGroupRef = useRef<ModalRef>(null);

  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [farm, setFarm] = useState<FarmProps | null>(null);
  const [cropSelect, setCropSelect] = useState<CropProps | null>(null);
  const [cropGroups, setCropGroups] = useState<CropGroupProps[]>([]);
  const [cropGroupsSelect, setCropGroupsSelect] =
    useState<CropGroupProps | null>(null);

  const load = async () => {
    const res = await callApi(`farm/${id}`, {}, "GET");
  
    if (res.success) {
      const farmData = res.data as FarmProps;
      setPageLoading(false);
      setFarm(farmData);

      if (farmData.crops && farmData.crops.length > 0) {
        const groupedCrops = groupCropsByYear(farmData);
        setCropGroups(groupedCrops);
      } else {
        setCropGroups([]);
      }
    }
  };

  const groupCropsByYear = (farmData: FarmProps): CropGroupProps[] => {
    const crops = farmData.crops;
    const groupsMap = new Map<number, CropProps[]>();

    crops.forEach((crop) => {
      if (!groupsMap.has(crop.year)) {
        groupsMap.set(crop.year, []);
      }
      groupsMap.get(crop.year)!.push(crop);
    });

    const groups = Array.from(groupsMap, ([year, crops]) => ({
      year,
      farmId: farmData.id,
      crops: crops.sort((a, b) => a.food.localeCompare(b.food)),
    })).sort((a, b) => b.year - a.year);

    return groups;
  };

  useEffect(() => {
    load();
  }, []);

  const cropForm = (cropSelect: CropProps | null) => {
    setCropSelect(cropSelect);
    modalCropFormRef.current?.open();
  };

  const cropGroupForm = (croptGroupSelect: CropGroupProps | null) => {
    setCropGroupsSelect(croptGroupSelect);
    modalCropGroupRef.current?.open();
  };

  const onFinishModal = (reference: string | null = null) => {
    if (reference == "farm") {
      modalFarmFormRef.current?.close(true);
    } else if (reference == "farm_drop") {
      router.replace("/farm");
      return;
    } else if (reference == "crop" || reference == "crop_drop") {
      modalCropFormRef.current?.close(true);
    }
    load();
  };

  if (!pageLoading && !farm) {
    router.push("/404");
    return;
  }

  if (pageLoading) {
    return (
      <Dashboard title="Carregando">
        <div>Carregando detalhes do fazenda...</div>
      </Dashboard>
    );
  }

  if (!farm) {
    return null;
  }

  return (
    <>
      <Dashboard
        title={farm.name}
        subtitle={farm.city + " / " + farm.state}
        menuActive={'/farm'}
        titleAction={
          <Button
            variant="secondaryOutline"
            size="sm"
            onClick={() => modalFarmFormRef.current?.open()}
          >
            Editar fazenda
          </Button>
        }
      >
        <Panel
          title={"Safras da fazenda"}
          actions={
            <>
              <Button variant="primary" onClick={() => cropForm(null)}>
                Nova cultura
              </Button>
            </>
          }
        >
          {cropGroups.length > 0 ? (
            <List>
              {cropGroups.map((cropGroup, i) => (
                <CropGroupItem
                  key={i}
                  cropGroup={cropGroup}
                  onClick={() => cropGroupForm(cropGroup)}
                />
              ))}
            </List>
          ) : (
            <p>Nenhum cultivo cadastrado.</p>
          )}
        </Panel>
      </Dashboard>
      <FarmModal
        ref={modalFarmFormRef}
        producerId={farm.producerId}
        farm={farm}
        onFinish={onFinishModal}
      />

      <CropFormModal
        ref={modalCropFormRef}
        farmId={farm.id}
        crop={cropSelect}
        onFinish={onFinishModal}
      />

      <CropGroupModal
        ref={modalCropGroupRef}
        cropGroup={cropGroupsSelect}
        onAdd={() => {
          modalCropGroupRef.current?.close(true);
          modalCropFormRef.current?.open();
        }}
        onEdit={(cropSelect) => {
          modalCropGroupRef.current?.close(true);
          cropForm(cropSelect);
        }}
      />
    </>
  );
}
