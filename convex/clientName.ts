import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createClient = mutation({
  args: {
    productId: v.id("product"),
    userId: v.id("user"),
    name: v.string(),
    phone: v.number(),
    aratwaraZingahe: v.number(),
    yishyuyeAngahe: v.number(),
    yishyuye: v.boolean(),
    productType: v.string(),
    facture: v.number(),
    yishyuyezingahe: v.optional(v.number()),
    amazeKwishyura: v.optional(v.number()),
    ayomazeGucuruza: v.optional(v.number()),
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
      yishyuye: args.yishyuye,
      facture: args.facture,
      yishyuyezingahe: args.yishyuyezingahe,
      amazeKwishyura: args.amazeKwishyura,
    });

    await ctx.runMutation(internal.product.updateProdut, {
      id: args.productId,
      value: args.aratwaraZingahe,
      productType: args.productType,
      ayomazeGucuruza: args.ayomazeGucuruza,
    });

    if (!newClient) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE CREATING ");
    }
    return newClient;
  },
});

export const getClientByIden = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const userId = args.userId as Id<"user">;
    const Client = await ctx.db
      .query("client")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("yishyuye"), false))
      .order("desc")
      .collect();

    if (!Client) {
      console.log(
        new ConvexError("SOMETHING WENT WRONNG WHILE GETTING Client")
      );
      return [];
    }
    return Client;
  },
});

export const getSaledProduct = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    try {
      // Get the start of the current day in UTC
      const startOfToday = new Date();
      startOfToday.setUTCHours(0, 0, 0, 0);
      const todayTimestamp = startOfToday.getTime();

      // Query the database for products created today
      const products = await ctx.db
        .query("client")
        .withIndex("by_userId", (q) =>
          q.eq("userId", args.userId ? args.userId : "")
        )
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
            q.eq(q.field("yishyuye"), true) // Cast _creationTime to number
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
  args: {
    id: v.id("client"),
    yishyuyeAngahe: v.number(),
    ideniRishizemo: v.boolean(),
    yishyuyezingahe: v.number(),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const client = await ctx.db.get(id);
    if (!client) return;
    await ctx.db.patch(id, {
      yishyuye: args.ideniRishizemo ? true : false,
      amazeKwishyura: client?.amazeKwishyura! + args.yishyuyeAngahe,
      yishyuyezingahe: client?.yishyuyezingahe! + args.yishyuyezingahe,
    });
  },
});

export const getClientWhoPaid = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const Product = await ctx.db
      .query("client")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .filter((q) => q.eq(q.field("yishyuye"), true))
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
        (q) => q.eq(q.field("yishyuye"), true) && q.eq(q.field("_id"), args.id)
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

export const getClientById = query({
  args: { id: v.id("client") },
  handler: async (ctx, args) => {
    try {
      const client = await ctx.db.get(args.id);
      if (!client) {
        console.log(
          new ConvexError("SOMETHING WENT WRONNG WHILE GETTING client")
        );
      }
      return client;
    } catch (error) {
      console.error("Error fetching products:", error);
      // Return an empty array in case of an error
    }
  },
});

export const getClientInIdenByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const Client = await ctx.db
      .query("client")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .filter((q) => q.eq(q.field("yishyuye"), false))
      .order("desc")
      .collect();

    if (!Client) {
      console.log(
        new ConvexError("SOMETHING WENT WRONNG WHILE GETTING Client")
      );
      return [];
    }
    return Client;
  },
});

export const getClientWhoPaidByName = query({
  args: { name: v.string(), facture: v.number() },
  handler: async (ctx, args) => {
    const Client = await ctx.db
      .query("client")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .filter((q) => q.eq(q.field("yishyuye"), true))
      .filter((q) => q.eq(q.field("facture"), args.facture))
      .order("desc")
      .collect();

    if (!Client) {
      console.log(
        new ConvexError("SOMETHING WENT WRONNG WHILE GETTING Client")
      );
      return [];
    }
    return Client;
  },
});

export const updateClient = mutation({
  args: {
    id: v.id("client"),
    fields: v.object({
      aratwaraZingahe: v.number(),
      yishyuyeAngahe: v.number(),
      yishyuyezingahe: v.optional(v.number()),
      amazeKwishyura: v.optional(v.number()),
    }),
  },

  handler: async (ctx, args) => {
    const { id, fields } = args;

    // Only update fields that are provided
    await ctx.db.patch(id, fields);

    const client = await ctx.db.get(id);
    if (!client) return;
    if (client.yishyuyezingahe === 0 && client.aratwaraZingahe === 0) {
      console.log("HERE IN DELETING");

      ctx.runMutation(internal.clientName.deleteClient, { id });
    }
  },
});

export const deleteClient = internalMutation({
  args: { id: v.id("client") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
