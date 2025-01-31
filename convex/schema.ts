import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  product: defineTable({
    igicuruzwa: v.string(),
    ikiranguzo: v.number(),
    ingano: v.number(),
    uzishyuraAngahe: v.number(),
    ukonyigurishaKuriDetail: v.number(),
    byoseHamwe: v.number(),
    ndanguyeZingahe: v.number(),
    userId: v.string(),
    ibyoUranguyeType: v.string(),
    ndanguyeGute: v.string(),
    inganoYizoNishyuye: v.number(),
    wishyuyeAngahe: v.number(),
    ayomazeGucuruza: v.optional(v.number()),
  })
    .index("by_igicuruzwa", ["igicuruzwa"])
    .index("by_userId", ["userId"]),
  client: defineTable({
    name: v.string(),
    phone: v.number(),
    igicuruzwa: v.string(),
    aratwaraZingahe: v.number(),
    yishyuyeAngahe: v.number(),
    yishyuye: v.boolean(),
    userId: v.string(),
    productId: v.id("product"),
    facture: v.number(),
    yishyuyezingahe: v.optional(v.number()),
    amazeKwishyura: v.optional(v.number()),
    ukoNyigurisha: v.optional(v.number()),
  })
    .index("by_name", ["name"])
    .index("by_userId", ["userId"]),
  user: defineTable({
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    email: v.string(),
    password: v.optional(v.string()),
    image: v.optional(v.string()),
    role: v.string(),
  }),
  ingaruProduct: defineTable({
    inganoYizoAgaruye: v.number(),
    userId: v.string(),
    productId: v.id("product"),
    name: v.string(),
    phone: v.number(),
    factureNumber: v.number(),
    ayoyariYishyuye: v.number(),
    igicuruzwa: v.optional(v.string()),
  })
    .index("by_name", ["name"])
    .index("by_userId", ["userId"]),
  notification: defineTable({
    userId: v.string(),
    message: v.string(),
    seen: v.boolean(),
  })
    .index("by_userId", ["userId"])
    .index("by_seen", ["seen"]),
});
