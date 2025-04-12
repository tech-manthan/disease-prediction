import mongoose from "mongoose";
import CONFIG from "../config";

async function connectDb() {
  try {
    mongoose.connection.on("connected", () => {
      console.log("database connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("database connection failed");
      process.exit(1);
    });

    await mongoose.connect(CONFIG.MONGO_URI!, { dbName: "raahat" });
  } catch (err) {
    if (err instanceof Error) {
      console.log("failed to connect to database", err.message);
      process.exit(1);
    }
  }
}

export default connectDb;
