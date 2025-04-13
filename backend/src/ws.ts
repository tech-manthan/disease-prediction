import generateDisasterData from "./utils/disaster";
import { wss } from "./server";

wss.on("connection", (ws) => {
  console.log("🌐 New WebSocket client connected");

  function sendRandomData() {
    const data = generateDisasterData();
    ws.send(JSON.stringify(data));

    const delay =
      Math.random() * (10 * 60 * 1000 - 3 * 60 * 1000) + 3 * 60 * 1000; // Between 3min to 20hr
    setTimeout(sendRandomData, 1000 * 60 * 1);
  }

  setTimeout(sendRandomData, 1000 * 60 * 0.5);

  ws.on("close", () => {
    console.log("disconnected");
  });
});
