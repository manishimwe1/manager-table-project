import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    igicuruzwa: v.string(),
    ikiranguzo: v.number(),
    ingano: v.number(),
    total: v.number(),
    status: v.string(),
    wishyuyeAngahe: v.number(),
  },
  handler: async (ctx, args) => {
    const newProduct = await ctx.db.insert("product", {
      igicuruzwa: args.igicuruzwa,
      ikiranguzo: args.ikiranguzo,
      ingano: args.ingano,
      total: args.total,
      status: args.status,
      wishyuyeAngahe: args.wishyuyeAngahe,
    });
    if (!newProduct) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE CREATING ");
    }
    return newProduct;
  },
});
export const getProduct = query({
  handler: async (ctx) => {
    const Product = await ctx.db.query("product").order("desc").collect();

    if (!Product) {
      console.log(
        new ConvexError("SOMETHING WENT WRONNG WHILE GETTING PRODUCT")
      );
      return [];
    }
    return Product;
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("product"),
    fields: v.object({
      // Define possible fields that can be updated and their types
      wishyuyeAngahe: v.optional(v.number()),
      igicuruzwa: v.optional(v.string()),
      ingano: v.optional(v.number()),
      ikiranguzo: v.optional(v.number()),
      total: v.optional(v.number()),
      status: v.optional(v.string()),
    }),
  },

  handler: async (ctx, args) => {
    const { id, fields } = args;

    // Only update fields that are provided
    await ctx.db.patch(id, fields);
  },
});
