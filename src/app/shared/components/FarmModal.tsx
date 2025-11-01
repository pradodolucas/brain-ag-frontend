/** @jsxImportSource @emotion/react */

"use client";

import { forwardRef, useState, useEffect } from "react";
import { Modal, ModalRef } from "@/components/Modal";
import { Button } from "@/components/Button";
import { InputText, Select } from "@/components/Form";
import { css } from "@emotion/react";
import { callApi } from "@/libs/utils/webservice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProducerProps } from "@/types/producer";

import { farmSchema, FarmFormData } from "../schemas/farm.schema";
import { FarmProps } from "@/types/farm";

interface FarmModalProps {
  onFinish?: (reference: string | null) => void;
  producerId?: number | null;
  producers?: ProducerProps[];
  farm?: FarmProps | null;
}

export const FarmModal = forwardRef<ModalRef, FarmModalProps>(
  ({ onFinish, producerId, producers = [], farm }, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    const isEdit = !!farm;

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FarmFormData>({
      resolver: zodResolver(farmSchema),
      defaultValues: {
        producerId: producerId ?? 0,
      },
    });

    useEffect(() => {
      if (farm) {
        reset({
          ...farm,
          producerId: producerId ?? 0,
        });
      } else {
        reset({
          name: "",
          state: "",
          city: "",
          totalArea: 0,
          cultivableArea: 0,
          vegetationArea: 0,
          producerId: producerId ?? 0,
        });
      }
    }, [farm, producerId, reset]);

    const onSubmit = async (data: FarmFormData) => {
      setLoading(true);
      try {
        const endpoint = isEdit ? `farm/${farm?.id}` : "farm";
        const method = isEdit ? "PATCH" : "POST";

        const res = await callApi(endpoint, data, method);
        setLoading(false);

        if (res) {
          onFinish?.("farm");
          reset();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const onDrop = async () => {
      try {
        const res = await callApi(`farm/${farm?.id}`, {}, "DELETE");
        if (res) {
          onFinish?.('farm_drop');
          reset();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const producerOptions =
      producers?.map((p) => ({
        value: String(p.id),
        label: `${p.name} (${p.taxId})`,
      })) || [];

    return (
      <Modal
        ref={ref}
        title={isEdit ? "Editar Fazenda" : "Nova Fazenda"}
        titleActions={
          isEdit && (
            <Button variant="dangerOutline" size="sm" onClick={() => onDrop()}>
              Deletar
            </Button>
          )
        }
        loading={loading}
        footer={
          <Button
            variant="primary"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {isEdit ? "Salvar alterações" : "Cadastrar"}
          </Button>
        }
      >
        <form
          css={css({
            display: "grid",
            gap: "1rem",
          })}
        >
          {!producerId && (
            <Select
              label="Produtor"
              placeholder="Selecione um produtor"
              options={producerOptions}
              register={register("producerId", { valueAsNumber: true })}
              error={errors.producerId?.message}
            />
          )}

          <InputText
            label="Nome"
            {...register("name")}
            error={errors.name?.message}
          />
          <InputText
            label="Estado"
            {...register("state")}
            error={errors.state?.message}
          />
          <InputText
            label="Cidade"
            {...register("city")}
            error={errors.city?.message}
          />
          <InputText
            label="Área Total (ha)"
            type="number"
            step="0.01"
            {...register("totalArea", { valueAsNumber: true })}
            error={errors.totalArea?.message}
          />
          <InputText
            label="Área Cultivável (ha)"
            type="number"
            step="0.01"
            {...register("cultivableArea", { valueAsNumber: true })}
            error={errors.cultivableArea?.message}
          />
          <InputText
            label="Área de Vegetação (ha)"
            type="number"
            step="0.01"
            {...register("vegetationArea", { valueAsNumber: true })}
            error={errors.vegetationArea?.message}
          />
        </form>
      </Modal>
    );
  }
);
