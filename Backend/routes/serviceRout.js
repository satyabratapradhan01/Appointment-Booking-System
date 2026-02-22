import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";


const serviceRouter = express.Router();

serviceRouter.post("/services", authMiddleware, authorizeRoles("SERVICE_PROVIDER"), (req, res) =>{
    return res.status(200).json({success: true, message: "hello services.."})
 })

export default serviceRouter