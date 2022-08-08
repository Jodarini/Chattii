import ws from "ws";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./router/index";
import { createContext } from "./router/context";
import fetch from "node-fetch";

if (!global.fetch) {
	(global as any).fetch = fetch;
}
const wss = new ws.Server({
	port: 3001,
});
const handler = applyWSSHandler({
	wss,
	router: appRouter,
	createContext,
});

wss.on("connection", ws => {
	console.log(`Got a connection (${wss.clients.size})`);
	ws.once("close", () => {
		console.log(`Closed connection (${wss.clients.size})`);
	});
});
console.log(
	"WebSocket Server listening on ws://localhost:3001"
);

process.on("SIGTERM", () => {
	console.log("SIGTERM");
	handler.broadcastReconnectNotification();
	wss.close();
});
