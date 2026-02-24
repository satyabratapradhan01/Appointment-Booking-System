import Service from "../model/serviceModel.js";
import Availability from "../model/availabilityModel.js";

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
  try {
    const type = req.query.type
  const validTypes = ["MEDICAL","HOUSE_HELP","BEAUTY","FITNESS","EDUCATION","OTHER"];
  if(type && !validTypes.includes(type)){
    return res.status(400).json({success: false, message: "Invalid service type"});
  }

  const filter = {};
  if(type){
    filter.type = type;
  }

  const services = await Service.find(filter).populate("providerId", "name");

  const result = services.map(service => ({
    id: service._id,
    name: service.name,
    type: service.type,
    durationMinutes: service.durationMinutes,
    providerName: service.providerId.name
  }))
  return res.status(200).json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Invalid service type"});
  }
}

export { createService, setAvailability, getServices};
