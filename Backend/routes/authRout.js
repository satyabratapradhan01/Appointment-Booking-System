import express from "express";
import {registerUser, loginUser} from "../controllers/authController.js"
import { validator } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/user.validator.js";

const authRouter = express.Router();

authRouter.use("/register", validator(registerSchema), registerUser);
authRouter.use("/login",validator(loginSchema), loginUser);

export default authRouter;