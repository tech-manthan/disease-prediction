import { createServer } from "node:http";
import app from "./app";
import { WebSocketServer } from "ws";

const server = createServer(app);

const wss = new WebSocketServer({ server });

export { wss, server };
