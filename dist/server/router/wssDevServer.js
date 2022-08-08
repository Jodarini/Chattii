"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const ws_2 = require("@trpc/server/adapters/ws");
const index_1 = require("./index");
const context_1 = require("./context");
const node_fetch_1 = __importDefault(require("node-fetch"));
if (!global.fetch) {
    global.fetch = node_fetch_1.default;
}
const wss = new ws_1.default.Server({
    port: 3001,
});
const handler = (0, ws_2.applyWSSHandler)({
    wss,
    router: index_1.appRouter,
    createContext: context_1.createContext,
});
wss.on("connection", ws => {
    console.log(`Got a connection (${wss.clients.size})`);
    ws.once("close", () => {
        console.log(`Closed connection (${wss.clients.size})`);
    });
});
console.log("WebSocket Server listening on ws://localhost:3001");
process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
    wss.close();
});
