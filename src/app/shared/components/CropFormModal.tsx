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
import { CropProps } from "@/types/crop";
import { cropSchema, CropFormData } from "../schemas/crop.schema";

interface CropModalProps {
  onFinish?: (reference: string | null) => void;
  farmId?: number | null;
  crop?: CropProps | null;
}

export const CropFormModal = forwardRef<ModalRef, CropModalProps>(
  ({ onFinish, farmId, crop }, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    const isEdit = !!crop;

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<CropFormData>({
      resolver: zodResolver(cropSchema),
      defaultValues: {
        farmId: farmId ?? 0,
      },
    });

    useEffect(() => {
      if (crop) {
        reset({
          ...crop,
          farmId: farmId ?? 0,
        });
      } else {
        reset({
          year: new Date().getFullYear(),
          food: "",
          farmId: farmId ?? 0,
        });
      }
    }, [crop, farmId, reset]);

    const onSubmit = async (data: CropFormData) => {
      setLoading(true);
      try {
        const endpoint = isEdit ? `crop/${crop?.id}` : "crop";
        const method = isEdit ? "PATCH" : "POST";

        const res = await callApi(endpoint, data, method);
        setLoading(false);

        if (res) {
          onFinish?.("crop");
          reset();
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const onDrop = async () => {
      try {
        const res = await callApi(`crop/${crop?.id}`, {}, "DELETE");
        if (res) {
          onFinish?.('crop_drop');
          reset();
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Modal
        ref={ref}
        title={isEdit ? "Editar Cultivo" : "Novo Cultivo"}
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
          <InputText
            label="Ano"
            type="number"
            {...register("year", { valueAsNumber: true })}
            error={errors.year?.message}
          />
          
          <InputText
            label="Cultivo"
            {...register("food")}
            error={errors.food?.message}
          />
        </form>
      </Modal>
    );
  }
);