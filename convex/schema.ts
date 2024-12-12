import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  product: defineTable({
    igicuruzwa: v.string(),
    ikiranguzo: v.number(),
    ingano: v.number(),
    uzishyuraAngahe: v.number(),
    status: v.boolean(),
    ukonyigurishaKuriDetailKuriDetail: v.number(),
    byoseHamwe: v.number(),
    inyungu: v.number(),
    ndanguyeZingahe: v.number(),
    userId: v.string(),
    ibyoUranguyeType: v.string(),
  })
    .index("by_igicuruzwa", ["igicuruzwa"])
    .index("by_userId", ["userId"]),
  client: defineTable({
    name: v.string(),
    phone: v.number(),
    igicuruzwa: v.string(),
    aratwaraZingahe: v.number(),
    yishyuyeAngahe: v.number(),
    nideni: v.boolean(),
    userId: v.string(),
    productId: v.id("product"),
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
});
