import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createNewFile = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You must be logged in to Upload.");
    }
    await ctx.db.insert("files", { name: args.name });
  },
});

export const listFiles = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    return ctx.db.query("files").collect();
  },
});
