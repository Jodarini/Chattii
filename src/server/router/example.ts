import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
	.query("hello", {
		input: z
			.object({
				text: z.string().nullish(),
			})
			.nullish(),
		resolve({ input }) {
			return {
				greeting: `Hello ${input?.text ?? "world"}`,
			};
		},
	})
	.query("getAll", {
		async resolve({ ctx }) {
			return await ctx.prisma.message.findMany();
		},
	})
	.mutation("sendMessage", {
		input: z.object({
			content: z.string(),
			userName: z.string(),
		}),
		async resolve({ ctx, input }) {
			const message = await ctx.prisma.message.create({
				data: {
					...input,
				},
			});
			return { success: true, content: message };
		},
	});
