import { z } from "zod";

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
    name: z.string().trim().min(1, { message: "Název alba je povinný" }).max(255),
    description: z.string().trim().max(255).optional(),
  })

  export const wordPair = z.object({
    term: z.string().trim().min(1, { message: "Pole je povinné" }).max(255),
    translation: z.string().trim().min(1, { message: "Pole je povinné" }).max(255),
    example: z.string().trim().max(255).optional(),
  });