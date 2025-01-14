import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const IngaruProduct = mutation({
  args: {
    igicuruzwa: v.string(),
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
      igicuruzwa: args.igicuruzwa,
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
