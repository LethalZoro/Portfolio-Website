import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell me your name").max(100, "Name is too long"),
  email: z.string().trim().email("That email doesn't look right").max(200),
  subject: z.string().trim().max(150, "Subject is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Give me a little more detail (10+ characters)")
    .max(5000, "Message is too long"),
  /** Honeypot: humans never fill this; the API silently drops filled ones. */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
