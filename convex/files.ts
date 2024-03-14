import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createNewFile = mutation({
  args: { name: v.string(), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new ConvexError("You must be logged in to Upload.");
    }
    await ctx.db.insert("files", { name: args.name, orgId: args.orgId });
  },
});

export const listFiles = query({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    return ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
  },
});
