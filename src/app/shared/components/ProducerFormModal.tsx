/** @jsxImportSource @emotion/react */

"use client";

// React
import { forwardRef, useState, useEffect } from "react";

// Form e Validação
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Button } from "@/components/Button";
import { InputText, Select } from "@/components/Form";
import { Modal, ModalRef } from "@/components/Modal";

// Types e Utils
import { callApi } from "@/libs/utils/webservice";
import { producerSchema, ProducerFormData } from "../schemas/producer.schema";
import { ProducerProps } from "@/types/producer";

interface ProducerFormModalProps {
  producer?: ProducerProps | null;
  onFinish?: (reference: string | null) => void;
}

export const ProducerFormModal = forwardRef<ModalRef, ProducerFormModalProps>(
  ({ onFinish, producer }, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [personType, setPersonType] = useState<
      "private individual" | "legal person"
    >("private individual");

    const isEdit = !!producer;

    const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { errors },
    } = useForm<ProducerFormData>({
      resolver: zodResolver(producerSchema),
      defaultValues: {
        personType: "private individual",
        name: "",
        taxId: "",
      },
    });

    // Observa mudanças no tipo de pessoa
    const watchPersonType = watch("personType");

    const resetForm = () => {
      reset();
      setPersonType("private individual");
    };

    const handlePersonTypeChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const value = event.target.value as "private individual" | "legal person";
      setPersonType(value);
      setValue("personType", value);
      setValue("name", "");
      setValue("taxId", "");
    };

    const personTypeRegister = register("personType");

    const onSubmit = async (data: ProducerFormData) => {
      setLoading(true);

      try {
        const payload = {
          ...data,
          document: data.taxId.replace(/\D/g, ""),
        };

        const endpoint = isEdit ? `producer/${producer?.id}` : "producer";
        const method = isEdit ? "PATCH" : "POST";

        const res = await callApi(endpoint, payload, method);

        setLoading(false);

        if (res.success) {
          resetForm();
          onFinish?.("producer");
        } else {
          console.error(res);
          // throw new Error(res.error ?? "error");
        }
      } catch (error) {
        // console.error(error);
      }
    };

    const onDrop = async () => {
      try {
        const res = await callApi(`producer/${producer?.id}`, {}, "DELETE");
        if (res) {
          onFinish?.("producer_drop");
          reset();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const personTypeOptions = [
      { value: "private individual", label: "Pessoa Física" },
      { value: "legal person", label: "Pessoa Jurídica" },
    ];

    const producerTaxRaw = producer?.taxId;

    const producerPersonTypeValue = (() => {
      if (producer && producerTaxRaw) {
        const digits = String(producerTaxRaw).replace(/\D/g, "");
        return digits.length > 11 ? "legal person" : "private individual";
      }
      return watch("personType") || personType;
    })();

    const producerTaxValue = producerTaxRaw || watch("taxId") || "";

    useEffect(() => {
      if (producer) {
        const tax = producer.taxId;
        const digits = String(tax).replace(/\D/g, "");
        const pType =
          digits.length > 11 ? "legal person" : "private individual";

        setValue("personType", pType as any);
        setValue("name", producer.name || "");
        setValue("taxId", tax as any);
        setPersonType(pType as any);
      }
    }, [producer, setValue]);

    const producerPersonTypeLabel = personTypeOptions.find(
      (o) => o.value === producerPersonTypeValue
    )?.label;

    return (
      <Modal
        ref={ref}
        title={isEdit ? "Editar agricultor" : "Adicionar agricultor"}
        loading={loading}
        titleActions={
          isEdit && (
            <Button variant="dangerOutline" size="sm" onClick={() => onDrop()}>
              Deletar
            </Button>
          )
        }
        footer={
          <>
            <Button
              variant="primary"
              loading={loading}
              onClick={handleSubmit(onSubmit)}
            >
              {isEdit ? "Salvar" : "Cadastrar"}
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {!isEdit ? (
            <Select
              ref={personTypeRegister.ref}
              label="Tipo de Pessoa"
              disabled={loading}
              options={personTypeOptions}
              value={watchPersonType}
              onChange={(e: any) => {
                personTypeRegister.onChange(e);
                handlePersonTypeChange(e);
              }}
              onBlur={personTypeRegister.onBlur}
              error={errors.personType?.message}
            />
          ) : (
            <div>
              <label style={{ display: "block", marginBottom: 8 }}>
                Tipo de Pessoa
              </label>
              <div
                style={{
                  padding: "8px 12px",
                  background: "#fff",
                  borderRadius: 4,
                  boxShadow: "rgba(0,0,0,0.04) 0px 0px 0px 1px",
                }}
              >
                {producerPersonTypeLabel || producerPersonTypeValue}
              </div>
            </div>
          )}

          <InputText
            label={
              watchPersonType === "private individual" ? "Nome" : "Razão Social"
            }
            placeholder={
              watchPersonType === "private individual"
                ? "Digite o nome completo"
                : "Digite a razão social"
            }
            disabled={loading}
            register={register("name")}
            error={errors.name?.message}
          />

          {!isEdit ? (
            <InputText
              label={watchPersonType === "private individual" ? "CPF" : "CNPJ"}
              placeholder={
                watchPersonType === "private individual"
                  ? "000.000.000-00"
                  : "00.000.000/0000-00"
              }
              disabled={loading}
              register={register("taxId")}
              error={errors.taxId?.message}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                let formattedValue = value;

                if (watchPersonType === "private individual") {
                  // Formata CPF: 000.000.000-00
                  if (value.length <= 11) {
                    formattedValue = value
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                  }
                } else {
                  // Formata CNPJ: 00.000.000/0000-00
                  if (value.length <= 14) {
                    formattedValue = value
                      .replace(/(\d{2})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d)/, "$1/$2")
                      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
                  }
                }

                e.target.value = formattedValue;
              }}
            />
          ) : (
            <div>
              <label style={{ display: "block", marginBottom: 8 }}>
                {producerPersonTypeValue === "private individual"
                  ? "CPF"
                  : "CNPJ"}
              </label>
              <div
                style={{
                  padding: "8px 12px",
                  background: "#fff",
                  borderRadius: 4,
                  boxShadow: "rgba(0,0,0,0.04) 0px 0px 0px 1px",
                }}
              >
                {producerTaxValue}
              </div>
            </div>
          )}
        </div>
      </Modal>
    );
  }
);
