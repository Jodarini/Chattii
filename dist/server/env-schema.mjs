"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url(),
    NODE_ENV: zod_1.z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET: zod_1.z.string(),
    NEXTAUTH_URL: zod_1.z.string().url(),
    GITHUB_CLIENT_ID: zod_1.z.string(),
    GITHUB_CLIENT_SECRET: zod_1.z.string(),
});
