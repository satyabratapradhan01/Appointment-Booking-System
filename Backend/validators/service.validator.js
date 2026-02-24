import z from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(2),
  type: z.enum([
    "MEDICAL",
    "HOUSE_HELP",
    "BEAUTY",
    "FITNESS",
    "EDUCATION",
    "OTHER",
  ]),
  durationMinutes: z
    .number()
    .min(30)
    .max(120)
    .refine((val) => val % 30 === 0, {
      message: "Duration must be multiple of 30",
    }),
});

const timeRegex = /^([01]\d|2[0-3]):(00|30)$/;
export const setAvailabilitySchema = z
  .object({
    dayOfWeek: z.number().min(0).max(6),
    startTime: z
      .string()
      .regex(timeRegex, "Time must be HH:MM with minutes 00 or 30"),
    endTime: z
      .string()
      .regex(timeRegex, "Time must be HH:MM with minutes 00 or 30"),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "startTime must be less than endTime",
    path: ["endTime"],
  });

  // export const getServices = z.object({
    
  //   name: z.string().min(2),
  //   type: z.string().min(2),
  //   "durationMinutes": 30,
  //   // "providerName": "Dr Smith"
  // })