import { z } from "zod";

export const cropSchema = z.object({
  year: z
    .number()
    .min(1900, "Ano deve ser maior ou igual a 1900")
    .max(new Date().getFullYear() + 10, "Ano não pode ser muito no futuro"),
  food: z.string().min(1, "Cultivo é obrigatório"),
  farmId: z.number(),
});

export type CropFormData = z.infer<typeof cropSchema>;
