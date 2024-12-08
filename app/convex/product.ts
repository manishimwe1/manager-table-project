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
    inyungu: v.number(),
    ndanguyeZingahe: v.number(),
  },
  handler: async (ctx, args) => {
    const newProduct = await ctx.db.insert("product", {
      igicuruzwa: args.igicuruzwa,
      ikiranguzo: args.ikiranguzo,
      ingano: args.ingano,
      uzishyuraAngahe: args.uzishyuraAngahe,
      status: args.status,
      ukonyigurisha: args.ukonyigurisha,
      inyungu: args.inyungu,
      ndanguyeZingahe: args.ndanguyeZingahe,
    });
    if (!newProduct) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE CREATING ");
    }
    return newProduct;
  },
});

export const getProduct = query({
  handler: async (ctx) => {
    const Product = await ctx.db
      .query("product")
      .filter((q) => q.gt(q.field("ingano"), 0))
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
export const getProductOutOfStock = query({
  handler: async (ctx) => {
    const Product = await ctx.db
      .query("product")
      .filter((q) => q.lte(q.field("ingano"), 1))
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
      ukonyigurisha: v.optional(v.number()),
      inyungu: v.optional(v.number()),
      ndanguyeZingahe: v.optional(v.number()),
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
    date: v.number(), // Pass the date as a UNIX timestamp
  },
  handler: async (ctx, args) => {
    const startOfDay = new Date(args.date).setHours(0, 0, 0, 0); // Start of the day
    const endOfDay = new Date(args.date).setHours(23, 59, 59, 999); // End of the day

    try {
      const Product = await ctx.db
        .query("product")
        .filter((q) =>
          q.and(
            q.gte(q.field("_creationTime"), startOfDay),
            q.lte(q.field("_creationTime"), endOfDay)
          )
        )
        .order("desc")
        .collect();

      return Product;
    } catch (error) {
      console.error("Error while fetching products:", error);
      throw new ConvexError("Something went wrong while getting the product");
    }
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
      return undefined;
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
    await ctx.db.patch(id, {
      ingano: Number(product?.ingano) - args.value,
      inyungu: product?.inyungu,
    });
  },
});
export const getProdutByName = query({
  args: { value: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("product")
      .withIndex("by_igicuruzwa", (q) => q.eq("igicuruzwa", args.value))
      .collect();
    if (!product) {
      new ConvexError("SOMETHING WENT WRONNG WHILE GETTING PRODUCT");
      return [];
    }
    return product;
  },
});
