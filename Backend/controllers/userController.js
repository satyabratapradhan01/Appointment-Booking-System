import { success } from "zod";
import userModel from "../model/userModel.js";
import { registerSchema, loginSchema } from "../validators/user.validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "48h" });
};

const registerUser = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, message: result.error.flatten() });
    }
    const { name, email, password, role } = result.data;

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
      role,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({success: false, message: result.error.flatten()})
    }
    const { email, password } = result.data;

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
    return res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser };
