import express from "express";
import { PORT } from "./config/index.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/database.js";
import cors from "cors";
const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
