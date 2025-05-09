import { Language } from "@/lib/generated/prisma";
import { z } from "zod";

const LanguageValues = Object.values(Language) as [Language, ...Language[]];

export const wordPairSchema = z
  .object({
    term: z.string().trim().max(255),
    translation: z.string().trim().max(255),
    example: z.string().trim().max(255).optional(),
  })
  .superRefine((data, ctx) => {
    const hasTerm = data.term !== "";
    const hasTranslation = data.translation !== "";
    if (hasTerm !== hasTranslation) {
      if (!hasTerm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vyplňte slovo",
          path: ["term"],
        });
      }
      if (!hasTranslation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vyplňte překlad",
          path: ["translation"],
        });
      }
    }
  });

  export const wordPairFormSchema = z
  .object({
    albumId: z.number(),
    pairs: z.array(wordPairSchema).max(20, {message: "Maximální počet řádků je 20."}),
  })
  .refine(
    (obj) => obj.pairs.some((item) => item.term !== "" || item.translation !== ""),
    {
      message: "Vyplňte alespoň jeden řádek",
      path: ["pairs"], 
    }
  );

  export const albumSchema = z.object({
    id: z.number().optional(),
    name: z.string().trim().min(1, { message: "Název alba je povinný" }).max(255),
    description: z.string().trim().max(255).optional(),
    language: z.enum(LanguageValues, {
      required_error: "Jazyk je povinný",
      invalid_type_error: "Neplatná hodnota jazyka",
    }),  })

  export const wordPair = z.object({
    id: z.number().optional(),
    term: z.string().trim().min(1, { message: "Pole je povinné" }).max(255),
    translation: z.string().trim().min(1, { message: "Pole je povinné" }).max(255),
    example: z.string().trim().max(255).optional(),
  });