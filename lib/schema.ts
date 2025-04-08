import { z } from "zod"
import {formType} from "@/lib/formType";
export const formSchema = (type: formType) => {
    return z.object({
        fullNames: type === "signup" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8)
    })
}