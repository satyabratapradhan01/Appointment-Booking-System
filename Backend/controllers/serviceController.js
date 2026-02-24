import Service from "../model/serviceModel.js";
import Availability from "../model/availabilityModel.js";
import { success } from "zod";

const createService = async (req, res) => {
  try {
    const { name, type, durationMinutes } = req.validatorData;

    const newService = new Service({
      name,
      type,
      providerId: req.user.id,
      durationMinutes,
    });

    await newService.save();

    return res.status(201).json({
      success: true,
      id: newService._id,
      name: newService.name,
      type: newService.type,
      durationMinutes: newService.durationMinutes,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const setAvailability = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.validatorData;
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    if (service.providerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Service does not belong to provider",
      });
    }

    const Overlapping = await Availability.findOne({
      serviceId,
      dayOfWeek,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });
    if (Overlapping) {
      return res
        .status(409)
        .json({ success: false, message: "Overlapping availability" });
    }

    const newAvailability = new Availability({
      serviceId,
      dayOfWeek,
      startTime,
      endTime,
    });
    await newAvailability.save()

    return res.status(201).json({ status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getServices = async (req, res) => {
  const type = req.query.type
  const validTypes = ["MEDICAL","HOUSE_HELP","BEAUTY","FITNESS","EDUCATION","OTHER"];
  if(!validTypes.includes(type)){
    return res.status(400).json({success: false, message: " Invalid service type"});
  }
  const services = await Service.find({type})
  console.log(services._id);
  // return res.status(200).json({id: services.name, message: "hello"})
}

export { createService, setAvailability, getServices};
