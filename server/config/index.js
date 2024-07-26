import { configDotenv } from "dotenv";
configDotenv();
export const {
    PORT,
    MONGO_URI,
    JWT_SECRET
} = process.env;