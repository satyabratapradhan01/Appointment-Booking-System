import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const userRouter = express.Router();

userRouter.post("/appointments", authMiddleware, authorizeRoles("USER"), (req, res) => {
    return res.status(200).json({success: true, message: "hello user..."});
})

export default userRouter;