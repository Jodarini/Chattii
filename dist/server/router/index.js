"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
// src/server/router/index.ts
const context_1 = require("./context");
const superjson_1 = __importDefault(require("superjson"));
const example_1 = require("./example");
const auth_1 = require("./auth");
exports.appRouter = (0, context_1.createRouter)()
    .transformer(superjson_1.default)
    .merge("example.", example_1.exampleRouter)
    .merge("auth.", auth_1.authRouter);
