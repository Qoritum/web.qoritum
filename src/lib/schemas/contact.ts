import * as z from "zod";

export const contactSchema = z.object({
    email: z.email("Email Requerido"),
    names: z.string().nonempty("Nombres Requerido"),
    phone: z.string().optional(),
    asunto: z.string().nonempty("Describe tu asunto"),
    message: z.string().nonempty("Especifica tu mensaje...")
})

export type ContactSchemaType = z.infer<typeof contactSchema>;
