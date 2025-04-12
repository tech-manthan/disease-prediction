import CONFIG from "./config";
import connectDb from "./db";
import { server } from "./server";

import "./ws";

const startServer = async function () {
  try {
    await connectDb();

    server.listen(CONFIG.PORT, () => {
      console.log(`server running on PORT : ${CONFIG.PORT}`);
    });
  } catch (err) {
    console.log("failed to start the server");
    process.exit(1);
  }
};

startServer();
