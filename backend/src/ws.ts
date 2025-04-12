import generateDisasterData from "./utils/disaster";
import { wss } from "./server";

wss.on("connection", (ws) => {
  console.log("🌐 New WebSocket client connected");

  function sendRandomData() {
    const data = generateDisasterData();
    ws.send(JSON.stringify(data));

    const delay =
      Math.random() * (20 * 60 * 60 * 1000 - 3 * 60 * 1000) + 3 * 60 * 1000; // Between 3min to 20hr
    setTimeout(sendRandomData, delay);
  }

  sendRandomData();
});
