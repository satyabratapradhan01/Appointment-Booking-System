import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

import { createService, setAvailability } from "../controllers/serviceController.js";
import { validator } from "../middleware/validate.js";
import { createServiceSchema,  } from "../validators/service.validator.js";


const serviceRouter = express.Router();

serviceRouter.post("/services", authMiddleware, authorizeRoles("SERVICE_PROVIDER"), validator(createServiceSchema), createService );
serviceRouter.post("/services", authMiddleware, authorizeRoles("SERVICE_PROVIDER"), validator(createServiceSchema), setAvailability );


export default serviceRouter