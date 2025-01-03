import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new task with the given text
export const createPurchase = mutation({
  args: {
    igicuruzwa: v.string(),
    ingano: v.number(),
    ukonyigurishaKuriDetail: v.number(),
    userId: v.id("user"),
    productType: v.string(),
    byoseHamwe: v.number(),
    name: v.string(),
    factureNumber: v.number(),
    productId: v.id("product"),
    purchaseNumber: v.number(),
    aratwaraZingahe: v.number(),
    yishyuyeAngahe: v.number(),
  },
  handler: async (ctx, args) => {
    console.log(args.userId, "userID..............");

    const newDraftPurchase = await ctx.db.insert("draftPurchase", {
      purchaseNumber: args.purchaseNumber,
      userId: args.userId,
      igicuruzwa: args.igicuruzwa,
      ingano: args.ingano,
      ukonyigurishaKuriDetail: args.ukonyigurishaKuriDetail,
      aratwaraZingahe: args.aratwaraZingahe,
      productType: args.productType,
      byoseHamwe: args.byoseHamwe,
      productId: args.productId,
      yishyuyeAngahe: args.yishyuyeAngahe,
      name: args.name,
      factureNumber: args.factureNumber,
    });
    if (!newDraftPurchase) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE CREATING ");
    }
    return newDraftPurchase;
  },
});

export const getDraftPurchase = query({
  args: { factureNumber: v.number(), name: v.string() },
  handler: async (ctx, args) => {
    const draftPurchase = await ctx.db
      .query("draftPurchase")
      .withIndex("by_factureNumber", (q) =>
        q.eq("factureNumber", args.factureNumber)
      )
      .filter((q) => q.eq(q.field("name"), args.name))
      .collect();
    if (!draftPurchase) {
      new ConvexError("SOMETHING WENT WRONNG WHILE GETTING ");
      return [];
    }
    return draftPurchase;
  },
});

export const updateDraftPurchase = mutation({
  args: {
    id: v.id("draftPurchase"),
    fields: v.object({
      // Define possible fields that can be updated and their types
      wishyuyeAngahe: v.optional(v.number()),
      igicuruzwa: v.optional(v.string()),
      ingano: v.optional(v.number()),
      ikiranguzo: v.optional(v.number()),
      uzishyuraAngahe: v.optional(v.number()),
      status: v.optional(v.boolean()),
      ukonyigurishaKuriDetailKuriDetail: v.optional(v.number()),
      inyungu: v.optional(v.number()),
      ndanguyeZingahe: v.optional(v.number()),
      byoseHamwe: v.optional(v.number()),
      ibyoUranguyeType: v.optional(v.string()),
    }),
  },

  handler: async (ctx, args) => {
    const { id, fields } = args;

    // Only update fields that are provided
    await ctx.db.patch(id, fields);
  },
});

export const getDraftPurchaseForMe = query({
  args: { userId: v.id("user") },
  handler: async (ctx, args) => {
    const draftPurchase = await ctx.db
      .query("draftPurchase")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    if (!draftPurchase) {
      new ConvexError("SOMETHING WENT WRONNG WHILE GETTING ");
      return [];
    }
    return draftPurchase;
  },
});
