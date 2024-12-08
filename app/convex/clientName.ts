import { internal } from "./_generated/api";
import { internalQuery, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createClient = mutation({
  args: {
    productId: v.id("product"),
    userId: v.id("string"),
    name: v.string(),
    phone: v.number(),
    aratwaraZingahe: v.number(),
    yishyuyeAngahe: v.number(),
    nideni: v.boolean(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE GETTING PRODUCT ");
    }

    const newClient = await ctx.db.insert("client", {
      productId: args.productId,
      userId: args.userId,
      name: args.name,
      phone: args.phone,
      igicuruzwa: product.igicuruzwa,
      aratwaraZingahe: args.aratwaraZingahe,
      yishyuyeAngahe: args.yishyuyeAngahe,
      nideni: args.nideni,
    });

    await ctx.runMutation(internal.product.updateProdut, {
      id: args.productId,
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

export const getSaledProduct = query({
  handler: async (ctx) => {
    try {
      // Get the start of the current day in UTC
      const startOfToday = new Date();
      startOfToday.setUTCHours(0, 0, 0, 0);
      const todayTimestamp = startOfToday.getTime();

      // Query the database for products created today
      const products = await ctx.db
        .query("client")
        .filter(
          (q) => q.gte(q.field("_creationTime"), todayTimestamp) // Cast _creationTime to number
        )
        .order("desc") // Order products by creation time in descending order
        .collect();

      console.log(`Found ${products.length} products created today.`);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  },
});
export const getSaledProductInDeni = query({
  handler: async (ctx) => {
    try {
      // Get the start of the current day in UTC
      const startOfToday = new Date();
      startOfToday.setUTCHours(0, 0, 0, 0);
      const todayTimestamp = startOfToday.getTime();

      // Query the database for products created today
      const products = await ctx.db
        .query("client")
        .filter(
          (q) =>
            q.gte(q.field("_creationTime"), todayTimestamp) &&
            q.eq(q.field("nideni"), true) // Cast _creationTime to number
        )
        .order("desc") // Order products by creation time in descending order
        .collect();

      console.log(`Found ${products.length} products created today.`);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  },
});

export const getClientByProductId = internalQuery({
  args: { id: v.id("product") },
  handler: async (ctx, args) => {
    try {
      const product = await ctx.db
        .query("client")
        .filter((q) => q.gte(q.field("productId"), args.id))
        .first();

      return product;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  },
});

export const updatePayedClient = mutation({
  args: { id: v.id("client") },
  handler: async (ctx, args) => {
    const { id } = args;

    await ctx.db.patch(id, { nideni: false });
  },
});

export const getClientWhoPaid = query({
  handler: async (ctx) => {
    const Product = await ctx.db
      .query("client")
      .filter((q) => q.eq(q.field("nideni"), false))
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
export const getClientWhoPaidById = query({
  args: { id: v.id("client") },
  handler: async (ctx, args) => {
    const Product = await ctx.db
      .query("client")
      .filter(
        (q) => q.eq(q.field("nideni"), false) && q.eq(q.field("_id"), args.id)
      )
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
