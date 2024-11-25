import { z } from "zod";

export const formSchema = z.object({
  igicuruzwa: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  ikiranguzo: z.coerce.number(),
  ingano: z.coerce.number(),
  total: z.coerce.number(),
  wishyuyeAngahe: z.coerce.number(),
  status: z.enum(["pending", "processing", "success"]),
});
