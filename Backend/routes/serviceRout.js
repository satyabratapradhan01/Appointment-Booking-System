import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

import { createService, setAvailability, getServices } from "../controllers/serviceController.js";
import { validator } from "../middleware/validate.js";
import { createServiceSchema, setAvailabilitySchema } from "../validators/service.validator.js";


const serviceRouter = express.Router();

serviceRouter.post("/services", authMiddleware, authorizeRoles("SERVICE_PROVIDER"), validator(createServiceSchema), createService );
serviceRouter.post("/services/:serviceId/availability", authMiddleware, authorizeRoles("SERVICE_PROVIDER"), validator(setAvailabilitySchema), setAvailability );
serviceRouter.get("/services", authMiddleware, authorizeRoles("SERVICE_PROVIDER"), getServices );


export default serviceRouter