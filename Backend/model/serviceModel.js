import mongoose from "mongoose";
import User from "./userModel.js"

const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, enum: ["MEDICAL", "HOUSE_HELP", "BEAUTY", "FITNESS", "EDUCATION", "OTHER"], required: true},
    providerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    durationMinutes: {type: Number, required: true}
},{
    timestamps: true
})

const Service = mongoose.model("Service", serviceSchema);
export default Service;
