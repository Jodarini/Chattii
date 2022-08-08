"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleRouter = void 0;
const context_1 = require("./context");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const events_1 = require("events");
const ee = new events_1.EventEmitter();
exports.exampleRouter = (0, context_1.createRouter)()
    .subscription("onAdd", {
    resolve() {
        return new server_1.Subscription(emit => {
            const onAdd = (data) => {
                emit.data(data);
            };
            ee.on("add", onAdd);
            return () => {
                ee.off("add", onAdd);
            };
        });
    },
})
    .query("getAll", {
    async resolve({ ctx }) {
        return await ctx.prisma.message.findMany();
    },
})
    .mutation("add", {
    input: zod_1.z.object({
        content: zod_1.z.string(),
        userName: zod_1.z.string(),
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
});
