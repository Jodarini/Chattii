"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const server_1 = require("@trpc/server");
const context_1 = require("./context");
exports.authRouter = (0, context_1.createRouter)()
    .query("getSession", {
    resolve({ ctx }) {
        return ctx.session;
    },
})
    .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
        throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
})
    .query("getSecretMessage", {
    async resolve({ ctx }) {
        return "You are logged in and can see this secret message!";
    },
});
