import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import storiesRoutes from "./routes/stories.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.listen(process.env.PORT, () => {
  console.log("server running");
});
connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/stories", storiesRoutes);
