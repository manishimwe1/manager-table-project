import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const IngaruProduct = mutation({
  args: {
    inganoYizoAgaruye: v.number(),
    userId: v.id("user"),
    productId: v.id("product"),
    name: v.string(),
    phone: v.number(),
    factureNumber: v.number(),
    ayoyariYishyuye: v.number(),
  },
  handler: async (ctx, args) => {
    console.log(args.userId, "userID..............");

    const ingaruProduct = await ctx.db.insert("ingaruProduct", {
      userId: args.userId,
      inganoYizoAgaruye: args.inganoYizoAgaruye,
      productId: args.productId,
      name: args.name,
      phone: args.phone,
      factureNumber: args.factureNumber,
      ayoyariYishyuye: args.ayoyariYishyuye,
    });
    if (!ingaruProduct) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE CREATING ");
    }
    return ingaruProduct;
  },
});

export const getIngaruProduct = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const IngaruProduct = await ctx.db
      .query("ingaruProduct")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .order("desc")
      .collect();

    if (!IngaruProduct) {
      console.log(
        new ConvexError("SOMETHING WENT WRONNG WHILE GETTING IngaruProduct")
      );
      return [];
    }
    return IngaruProduct;
  },
});
