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
  args: { name: v.string(), factureNumber: v.number() },
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
