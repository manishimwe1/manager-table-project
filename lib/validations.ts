import { z } from "zod";

export const formSchema = z.object({
  igicuruzwa: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  ikiranguzo: z.coerce.number(),
  ingano: z.coerce.number(),
  birishyuwe: z.boolean(),
  uzishyuraAngahe: z.undefined(),
  ukonyigurisha: z.coerce.number(),
});
