import z from "zod";

export const createServiceSchema = z.object({
    name: z.string().min(2),
    type: z.enum(["MEDICAL", "HOUSE_HELP", "BEAUTY", "FITNESS", "EDUCATION", "OTHER"]),
    durationMinutes: z.number().min(30).max(120).refine((val) => val % 30 === 0, {message: "Duration must be multiple of 30"}),
})