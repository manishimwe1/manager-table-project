import { api, internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createClient = mutation({
  args: {
    id: v.id("product"),
    name: v.string(),
    phone: v.number(),
    aratwaraZingahe: v.number(),
    yishyuyeAngahe: v.number(),
    nideni: v.boolean(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE GETTING PRODUCT ");
    }

    const newClient = await ctx.db.insert("client", {
      name: args.name,
      phone: args.phone,
      igicuruzwa: product.igicuruzwa,
      aratwaraZingahe: args.aratwaraZingahe,
      yishyuyeAngahe: args.yishyuyeAngahe,
      nideni: args.nideni,
    });

    await ctx.runMutation(internal.product.updateProdut, {
      id: args.id,
      value: args.aratwaraZingahe,
    });
    if (!newClient) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE CREATING ");
    }
    return newClient;
  },
});

export const getClientByIden = query({
  handler: async (ctx) => {
    const Product = await ctx.db
      .query("client")
      .filter((q) => q.eq(q.field("nideni"), true))
      .order("desc")
      .collect();

    if (!Product) {
      console.log(
        new ConvexError("SOMETHING WENT WRONNG WHILE GETTING PRODUCT")
      );
      return [];
    }
    return Product;
  },
});
