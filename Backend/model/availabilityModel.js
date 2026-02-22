import mongoose from "mongoose";
import Service from "./serviceModel.js";

const availabilitySchema = new mongoose.Schema({
    serviceId: {type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true},
    dayOfWeek: {type: Number, required: true, min:0, max:6},
    startTime: {type: String, required: true},
    endTime: {type: String, required: true}
},
{timestamps: true})

const Availability = mongoose.model("Availability", availabilitySchema);

export default Availability;