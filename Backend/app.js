import express from "express";
import connectDB from "./config/mongoDb.js";
import "dotenv/config";

import authRouter from "./routes/authRout.js";
import serviceRouter from "./routes/serviceRout.js";
import userRouter from "./routes/userRout.js";

const app = express();
const port = 8080;
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is working");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/service", serviceRouter);

app.listen(port, () => {
  console.log(`server is listening port no ${port}`);
});
