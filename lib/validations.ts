import { z } from "zod";

export const formSchema = z.object({
  igicuruzwa: z.string().min(2, {
    message: "igicuruzwa cy' igomba kuruta inyuguti 1",
  }),
  ikiranguzo: z.coerce
    .number()
    .min(1, { message: "ikiranguzo kigomba kuba hejuru ya 0" }),
  ingano: z.coerce
    .number()
    .min(1, { message: "ingano igomba kuba hejuru ya 0" }),
  birishyuwe: z.enum(["nishyuyeCash", "mfasheIdeni", "nishyuyeMake"]),
  uzishyuraAngahe: z.number(),
  ukonyigurishaKuriDetail: z.coerce
    .number()
    .min(1, { message: "ukonyigurishaKuriDetail igomba kuba hejuru ya 0" }),

  wishyuyeAngahe: z.coerce.number().min(0),
  inganoYizoNishyuye: z.coerce.number().min(0),
});

export const EditProductformSchema = z.object({
  igicuruzwa: z.string().min(2, {
    message: "igicuruzwa cy' igomba kuruta inyuguti 1",
  }),
  ikiranguzo: z.coerce
    .number()
    .min(1, { message: "ikiranguzo kigomba kuba hejuru ya 0" }),
  ingano: z.coerce
    .number()
    .min(1, { message: "ingano igomba kuba hejuru ya 0" }),
  birishyuwe: z.string(),
  uzishyuraAngahe: z.number(),
  ukonyigurishaKuriDetail: z.coerce
    .number()
    .min(1, { message: "ukonyigurishaKuriDetail igomba kuba hejuru ya 0" }),

  wishyuyeAngahe: z.coerce.number().min(0),
  inganoYizoNishyuye: z.coerce.number().min(0),
});
export const invoiceSchema = z.object({
  buzName: z.string().min(2).max(500),
  email: z.string().email(),
  streetNo: z.string(),
  buzPhone: z.coerce.number(),
});
export const ingaruSchema = z.object({
  agaruyeZingahe: z.coerce.number(),
});
