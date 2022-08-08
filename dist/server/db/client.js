"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// src/server/db/client.ts
const client_1 = require("@prisma/client");
const env_mjs_1 = require("../env.mjs");
exports.prisma = global.prisma ||
    new client_1.PrismaClient({
        log: ["query"],
    });
if (env_mjs_1.env.NODE_ENV !== "production") {
    global.prisma = exports.prisma;
}
