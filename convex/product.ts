import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    igicuruzwa: v.string(),
    ikiranguzo: v.number(),
    ingano: v.number(),
    uzishyuraAngahe: v.number(),
    status: v.boolean(),
    ukonyigurisha: v.number(),
  },
  handler: async (ctx, args) => {
    const newProduct = await ctx.db.insert("product", {
      igicuruzwa: args.igicuruzwa,
      ikiranguzo: args.ikiranguzo,
      ingano: args.ingano,
      uzishyuraAngahe: args.uzishyuraAngahe,
      status: args.status,
      ukonyigurisha: args.ukonyigurisha,
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
      uzishyuraAngahe: v.optional(v.number()),
      status: v.optional(v.boolean()),
    }),
  },

  handler: async (ctx, args) => {
    const { id, fields } = args;

    // Only update fields that are provided
    await ctx.db.patch(id, fields);
  },
});

export const getProductByDate = query({
  args: {
    date: v.number(),
  },
  handler: async (ctx, args) => {
    console.log(args.date, ".....................");

    const Product = await ctx.db
      .query("product")
      .order("desc")
      .filter((q) => q.eq(q.field("_creationTime"), args.date))
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

export const getProductById = query({
  args: { id: v.id("product") },
  handler: async (ctx, args) => {
    const Product = await ctx.db.get(args.id);

    if (!Product) {
      console.log(
        new ConvexError("SOMETHING WENT WRONNG WHILE GETTING PRODUCT")
      );
      return [];
    }
    return Product;
  },
});

export const updateProdut = internalMutation({
  args: { id: v.id("product"), value: v.number() },
  handler: async (ctx, args) => {
    const { id } = args;
    const product = await ctx.db.get(id);
    if (!product) {
      new ConvexError("SOMETHING WENT WRONNG WHILE GETTING PRODUCT");
    }
    await ctx.db.patch(id, { ingano: Number(product?.ingano) - args.value });
  },
});
