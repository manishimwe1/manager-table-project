import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new task with the given text
export const createNotification = internalMutation({
  args: {
    userId: v.string(),
    message: v.string(),
    seen: v.boolean(),
  },
  handler: async (ctx, args) => {
    console.log(args.userId, "userID..............");

    const newNotification = await ctx.db.insert("notification", {
      userId: args.userId,
      message: args.message,
      seen: args.seen,
      
    });
    if (!newNotification) {
      return new ConvexError("SOMETHING WENT WRONNG WHILE CREATING ");
    }
    return newNotification;
  },
});

export const getProduct = query({
  args: { userId: v.optional(v.id("user")) },
  handler: async (ctx, args) => {
    const Product = await ctx.db
      .query("product")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
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