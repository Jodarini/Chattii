import { createRouter } from "./context";
import { z } from "zod";
import { Message } from "@prisma/client";
import { Subscription, TRPCError } from "@trpc/server";
import { EventEmitter } from "events";

const ee = new EventEmitter();

export const exampleRouter = createRouter()
	.query("getAll", {
		async resolve({ ctx }) {
			return await ctx.prisma.message.findMany();
		},
	})
	.mutation("add", {
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
			ee.emit("add", message);
			return { success: true, content: message };
		},
	})
	.subscription("onAdd", {
		resolve() {
			return new Subscription<Message>(emit => {
				const onAdd = (data: Message) => {
					emit.data(data);
				};

				ee.on("add", onAdd);

				return () => {
					ee.off("add", onAdd);
				};
			});
		},
	});
