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
    email: z.string().min(1, "Email is required!").email(),
    password: z.string().min(1, "Password is required!")
})

export const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name can only have 100 characters"),
    email: z.string().min(1, "Email is required!").max(100, "email can only have 100 characters").email(),
    password: passwordSchema
})  

export const ResetSchema = z.object({
    email: z.string().min(1, "email is required").email(),
});

export const NewPasswordSchema = z.object({
    password: passwordSchema,
})