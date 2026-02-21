import express from "express";
import {registerUser, loginUser} from "../controllers/userController.js"
const userRouter = express.Router();

userRouter.use("/register", registerUser);
userRouter.use("/login", loginUser);

export default userRouter;