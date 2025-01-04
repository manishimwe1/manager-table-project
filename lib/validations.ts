import { z } from "zod";

export const formSchema = z.object({
  igicuruzwa: z.string().min(2, {
    message: "igicuruzwa cy' igomba kuruta inyuguti 1",
  }),
  ikiranguzo: z.coerce
    .number()
    .min(1, { message: "ikiranguzo kigomba kuba hejuru ya 0" }),
  // ikiranguzoKuriDetail: z.coerce
  //   .number()
  //   .min(1, { message: "ikiranguzo kigomba kuba hejuru ya 0" }),
  ingano: z.coerce
    .number()
    .min(1, { message: "ingano igomba kuba hejuru ya 0" }),
  birishyuwe: z.enum(["nishyuyeCash", "mfasheIdeni", "nishyuyeMake"]),
  uzishyuraAngahe: z.number(),
  // ukonyigurishaKuriDetail: z.coerce
  //   .number()
  //   .min(1, { message: "ukonyigurishaKuriDetail igomba kuba hejuru ya 0" }),
  ukonyigurishaKuriDetail: z.coerce
    .number()
    .min(1, { message: "ukonyigurishaKuriDetail igomba kuba hejuru ya 0" }),
  // ibyoUranguyeType: z.enum([
  //   "Kuri detail",
  //   "Ibiro",
  //   "Ikesi x 12",
  //   "Ikesi x 20",
  //   "Amakarito",
  //   "Imifuka",
  // ]),
  wishyuyeAngahe: z.coerce.number().min(0),
  inganoYizoNishyuye: z.coerce.number().min(0),
});
