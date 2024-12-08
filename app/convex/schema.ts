import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  product: defineTable({
    igicuruzwa: v.string(),
    ikiranguzo: v.number(),
    ingano: v.number(),
    uzishyuraAngahe: v.number(),
    status: v.boolean(),
    ukonyigurisha: v.number(),
    inyungu: v.number(),
    ndanguyeZingahe: v.number(),
  }).index("by_igicuruzwa", ["igicuruzwa"]),
  client: defineTable({
    name: v.string(),
    phone: v.number(),
    igicuruzwa: v.string(),
    aratwaraZingahe: v.number(),
    yishyuyeAngahe: v.number(),
    nideni: v.boolean(),
    productId: v.id("product"),
    userId: v.string(),
  }).index("by_name", ["name"]),
  user: defineTable({
    firstname: v.optional(v.string()),
    lastname: v.optional(v.string()),
    email: v.string(),
    password: v.optional(v.string()),
    image: v.optional(v.string()),
    role: v.string(),
  }),
});
