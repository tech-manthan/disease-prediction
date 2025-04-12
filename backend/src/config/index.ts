import dotenv from "dotenv";

dotenv.config();

const { PORT, MONGO_URI, SALT, JWT_SECRET } = process.env;

const CONFIG = Object.freeze({
  PORT,
  MONGO_URI,
  SALT: parseInt(SALT as string) || 10,
  JWT_SECRET,
});

export default CONFIG;
