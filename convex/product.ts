import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    igicuruzwa: v.string(),
    ikiranguzo: v.number(),
    ingano: v.number(),
    uzishyuraAngahe: v.number(),
    ndanguyeGute: v.string(),
    inganoYizoNishyuye: v.number(),
    wishyuyeAngahe: v.number(),
    ukonyigurishaKuriDetail: v.number(),
    ndanguyeZingahe: v.number(),
    userId: v.id("user"),
    ibyoUranguyeType: v.string(),
    byoseHamwe: v.number(),
    ayomazeGucuruza: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    console.log(args.userId, "userID..............");

    const newProduct = await ctx.db.insert("product", {
      userId: args.userId,
      igicuruzwa: args.igicuruzwa,
      ikiranguzo: args.ikiranguzo,
      ingano: args.ingano,
      uzishyuraAngahe: args.uzishyuraAngahe,
      ndanguyeGute: args.ndanguyeGute,
      ukonyigurishaKuriDetail: args.ukonyigurishaKuriDetail,
      ndanguyeZingahe: args.ndanguyeZingahe,
      ibyoUranguyeType: args.ibyoUranguyeType,
      byoseHamwe: args.byoseHamwe,
      inganoYizoNishyuye: args.inganoYizoNishyuye,
      wishyuyeAngahe: args.wishyuyeAngahe,
      ayomazeGucuruza: args.ayomazeGucuruza,
    });
    if (!newProduct) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE CREATING ");
    }
    return newProduct;
  },
});

export const getProduct = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const Product = await ctx.db
      .query("product")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .filter((q) => q.gt(q.field("byoseHamwe"), 0))
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

export const getAllProduct = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const Product = await ctx.db
      .query("product")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
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
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const Product = await ctx.db
      .query("product")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .filter((q) => q.eq(q.field("byoseHamwe"), 0))
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
      ndanguyeGute: v.optional(v.string()),
      ukonyigurishaKuriDetail: v.optional(v.number()),
      ndanguyeZingahe: v.optional(v.number()),
      byoseHamwe: v.optional(v.number()),
      ibyoUranguyeType: v.optional(v.string()),
      inganoYizoNishyuye: v.optional(v.number()),
      ayomazeGucuruza: v.optional(v.number()),
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
  args: {
    id: v.id("product"),
    value: v.number(),
    productType: v.string(),
    ayomazeGucuruza: v.optional(v.number()),
  },

  handler: async (ctx, args) => {
    const { id } = args;
    const product = await ctx.db.get(id);
    if (!product) {
      new ConvexError("SOMETHING WENT WRONNG WHILE GETTING PRODUCT");
    }
    console.log(args.productType);

    if (
      args.productType === "Ikesi x 12" ||
      args.productType === "Ikesi x 20"
    ) {
      return await ctx.db.patch(id, {
        byoseHamwe: Number(product?.byoseHamwe) - args.value,
        ayomazeGucuruza:
          Number(product?.ayomazeGucuruza) +
          args.value * product?.ukonyigurishaKuriDetail!,
          ingano:product?.ingano === 0 ? args.value : product?.ingano
      });
    } else if (args.productType === "Kuri detail") {
      return await ctx.db.patch(id, {
        byoseHamwe: product?.byoseHamwe === 0 ? args.value : Number(product?.byoseHamwe) - args.value,
        ayomazeGucuruza:
          Number(product?.ayomazeGucuruza) +
          args.value * product?.ukonyigurishaKuriDetail!,
          
      });
    }
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

export const getProductByProductType = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const Product = await ctx.db
      .query("product")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .filter((q) => q.gt(q.field("ingano"), 0))
      .filter((q) => q.neq(q.field("ibyoUranguyeType"), "Kuri detail"))
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
export const getProductByKuriDetail = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const Product = await ctx.db
      .query("product")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .filter((q) => q.gt(q.field("ingano"), 0))
      .filter((q) => q.eq(q.field("ibyoUranguyeType"), "Kuri detail"))
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

export const deleteProduct = mutation({
  args: { id: v.id("product") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getProductInIdeni = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const Product = await ctx.db
      .query("product")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .filter((q) =>
        q.or(
          q.eq(q.field("ndanguyeGute"), "mfasheIdeni"),
          q.eq(q.field("ndanguyeGute"), "nishyuyeMake")
        )
      )
      .order("desc")
      .collect();

    if (!Product) {
      console.log(
        new ConvexError("SOMETHING WENT WRONG WHILE GETTING PRODUCT")
      );
      return [];
    }
    return Product;
  },
});
