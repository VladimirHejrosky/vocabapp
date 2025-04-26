import { z } from "zod";

export const wordPairSchema = z
  .object({
    term: z.string().trim(),
    translation: z.string().trim(),
    example: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    const hasTerm = data.term !== "";
    const hasTranslation = data.translation !== "";
    if (hasTerm !== hasTranslation) {
      if (!hasTerm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vyplňte výraz",
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
    pairs: z.array(wordPairSchema),
  })
  .refine(
    (obj) => obj.pairs.some((item) => item.term !== "" || item.translation !== ""),
    {
      message: "Vyplňte alespoň jeden řádek",
      path: ["pairs"], 
    }
  );
