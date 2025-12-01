import { z } from "zod";

export const userSignupSchema = z.object({
    userEmail: z.string().email(),
    userPassword: z.string().superRefine((val, ctx) => {
        if (val.length < 8) {
            ctx.addIssue({
                code: "custom",
                message: "Too small for a password sir"
            })
        }
        if (!/[A-Z]/.test(val)) {
            ctx.addIssue({
                code: "custom",
                message: "Password should contain atleast one uppercase letter"
            })
        }
        if (!/[a-z]/.test(val)) {
            ctx.addIssue({
                code: "custom",
                message: "Password should contain atleast one lowercase letter"
            })
        }
        if (!/[!@#$&*]/.test(val)) {
            ctx.addIssue({
                code: "custom",
                message: "Password should contain atleast one special character"
            })
        }
    }),
    userFirstName: z.string(),
    userLastName: z.string()
})