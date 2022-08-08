"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = exports.createContext = void 0;
// src/server/router/context.ts
const trpc = __importStar(require("@trpc/server"));
const react_1 = require("next-auth/react");
const client_1 = require("../db/client");
// export const createContext = async (
// 	opts?: trpcNext.CreateNextContextOptions
// ) => {
// 	const req = opts?.req;
// 	const res = opts?.res;
// 	const session =
// 		req &&
// 		res &&
// 		(await getServerSession(req, res, nextAuthOptions));
// 	return {
// 		req,
// 		res,
// 		session,
// 		prisma,
// 	};
// };
const createContext = async ({ req, res, }) => {
    var _a, _b;
    const session = await (0, react_1.getSession)({ req });
    console.log("createContext for", (_b = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "unknown user");
    return {
        req,
        res,
        prisma: client_1.prisma,
        session,
    };
};
exports.createContext = createContext;
const createRouter = () => trpc.router();
exports.createRouter = createRouter;
