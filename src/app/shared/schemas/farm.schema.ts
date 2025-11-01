import { z } from "zod";

export const farmSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    state: z.string().min(1, "Estado é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    totalArea: z.number().positive("Área total deve ser positiva"),
    cultivableArea: z.number().nonnegative("Área cultivável deve ser positiva"),
    vegetationArea: z
      .number()
      .nonnegative("Área de vegetação deve ser positiva"),
    producerId: z.number(),
  })
  .refine(
    (data) => data.totalArea >= data.cultivableArea + data.vegetationArea,
    {
      message:
        "A soma das áreas cultivável e de vegetação não pode ser maior que a área total.",
      path: ["totalArea"], // campo onde o erro será exibido
    }
  );

export type FarmFormData = z.infer<typeof farmSchema>;
