import * as z from "zod"

const passwordSchema = z
    .string()
    .min(8, 'Password should be at least 8 characters!')
    .refine((value) => /[A-Z]/.test(value), {
        message: 'Password must contain at least one uppercase letter!',
    })
    .refine((value) => /\d/.test(value), {
        message: 'Password must contain at least one number!',
    })
    .refine((value) => /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(value), {
        message: 'Password must contain at least one symbol!',
    });

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required!")
})