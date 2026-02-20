import express from "express";
import connectDB from "./config/mongoDb.js";
import "dotenv/config";

import userModel from "./model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const port = 8080;
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is working");
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '48h'});
};

// userRegister
app.post("/api/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exit = await userModel.findOne({ email });
    if (exit) {
      return res.json({ success: false, message: "user is alredy exit." });
    }

    if (!password || password.length < 8) {
      return res.json({
        success: false,
        message: "password must be more than 8",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel({
      name,
      email,
      passwordHash: hashPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
});

// userLogin
app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "email not exit" });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (isMatch) {
    const token = createToken(user._id);
    return res.json({ success: true, token });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
});

app.listen(port, () => {
  console.log(`server is listening port no ${port}`);
});
