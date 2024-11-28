import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  product: defineTable({
    igicuruzwa: v.string(),
    ikiranguzo: v.number(),
    ingano: v.number(),
    total: v.number(),
    wishyuyeAngahe: v.number(),
    status: v.string(),
  }).index("by_igicuruzwa", ["igicuruzwa"]),
  client: defineTable({
    name: v.string(),
    phone: v.number(),
    productId: v.id("product"),
  }).index("by_name", ["name"]),
});
