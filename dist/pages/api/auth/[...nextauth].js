"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const github_1 = __importDefault(require("next-auth/providers/github"));
// import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
const prisma_adapter_1 = require("@next-auth/prisma-adapter");
const client_1 = require("../../../server/db/client");
const env_mjs_1 = require("../../../server/env.mjs");
exports.authOptions = {
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    // Configure one or more authentication providers
    adapter: (0, prisma_adapter_1.PrismaAdapter)(client_1.prisma),
    providers: [
        (0, github_1.default)({
            clientId: env_mjs_1.env.GITHUB_CLIENT_ID,
            clientSecret: env_mjs_1.env.GITHUB_CLIENT_SECRET,
        }),
        // ...add more providers here
        // CredentialsProvider({
        // 	name: "Credentials",
        // 	credentials: {
        // 		name: {
        // 			label: "Name",
        // 			type: "text",
        // 			placeholder: "Enter your name",
        // 		},
        // 	},
        // 	async authorize(credentials, _req) {
        // 		const user = {
        // 			id: 1,
        // 			name: credentials?.name ?? "J Smith",
        // 		};
        // 		return user;
        // 	},
        // }),
    ],
};
exports.default = (0, next_auth_1.default)(exports.authOptions);
