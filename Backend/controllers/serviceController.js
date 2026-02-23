import { success } from "zod";
import Service from "../model/serviceModel.js";

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

  return res
    .status(201)
    .json({
      success: true,
      id: newService._id,
      name: newService.name,
      type: newService.type,
      durationMinutes: newService.durationMinutes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Internal server error"});
  }
};

const setAvailability = (req, res) => ({

})

export { createService, setAvailability };
