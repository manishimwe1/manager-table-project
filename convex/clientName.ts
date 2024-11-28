import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createClient = mutation({
  args: {
    name: v.string(),
    phone: v.number(),
    productId: v.id("product"),
  },
  handler: async (ctx, args) => {
    const newProduct = await ctx.db.insert("client", {
      name: args.name,
      phone: args.phone,
      productId: args.productId,
    });
    if (!newProduct) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE CREATING ");
    }
    return newProduct;
  },
});
