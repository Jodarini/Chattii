// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";
import { prisma } from "../db/client";
import { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import { IncomingMessage } from "http";
import ws from "ws";

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

export const createContext = async ({
	req,
	res,
}:
	| trpcNext.CreateNextContextOptions
	| NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
	const session = await getSession({ req });
	console.log(
		"createContext for",
		session?.user?.name ?? "unknown user"
	);
	return {
		req,
		res,
		prisma,
		session,
	};
};

type Context = trpc.inferAsyncReturnType<
	typeof createContext
>;

export const createRouter = () => trpc.router<Context>();
