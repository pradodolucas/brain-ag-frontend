import { z } from "zod";

export const producerSchema = z
  .object({
    personType: z.enum(["private individual", "legal person"]),
    name: z.string().min(1, "O nome é obrigatório"),
    taxId: z.string().min(1, "O documento é obrigatório"),
  })
  .refine(
    (data) => {
      if (data.personType === "private individual") {
        const cleanTaxId = data.taxId.replace(/\D/g, "");
        return cleanTaxId.length === 11;
      } else {
        const cleanTaxId = data.taxId.replace(/\D/g, "");
        return cleanTaxId.length === 14;
      }
    },
    {
      message: "Documento inválido para o tipo selecionado",
      path: ["taxId"],
    }
  )
  .refine(
    (data) => {
      if (data.personType === "private individual") {
        return data.name.length >= 3 && data.name.length <= 100;
      } else {
        return data.name.length >= 3 && data.name.length <= 200;
      }
    },
    {
      message: "O nome deve ter entre 3 e 200 caracteres",
      path: ["name"],
    }
  );

export type ProducerFormData = z.infer<typeof producerSchema>;
