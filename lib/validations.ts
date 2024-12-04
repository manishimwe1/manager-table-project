import { z } from "zod";

export const formSchema = z.object({
  igicuruzwa: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  ikiranguzo: z.coerce
    .number()
    .min(1, { message: "ikiranguzo kigomba kuba hejuru ya 0" }),
  ingano: z.coerce
    .number()
    .min(1, { message: "ingano igomba kuba hejuru ya 0" }),
  birishyuwe: z.boolean(),
  uzishyuraAngahe: z.undefined(),
  ukonyigurisha: z.coerce
    .number()
    .min(1, { message: "ukonyigurisha igomba kuba hejuru ya 0" }),
});
