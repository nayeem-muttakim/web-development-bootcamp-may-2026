import { config } from "dotenv";
import express from "express";
import { connectDB, disconnectDB } from "./config/db.js";
import cors from "cors";
config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = 3001;
const server = app.listen(port, () => {
  console.log(`Port running on ${port}`);
});
