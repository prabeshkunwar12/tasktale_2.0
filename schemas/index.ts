import { UserRole } from "@prisma/client";
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
    password: z.string().min(1, "Password is required!"),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name can only have 100 characters"),
    email: z.string().min(1, "Email is required!").max(100, "email can only have 100 characters").email(),
    password: passwordSchema
})  

export const ResetSchema = z.object({
    email: z.string().min(1, "email is required").email(),
})

export const NewPasswordSchema = z.object({
    password: passwordSchema,
})

export const NewTaskSchema = z.object({
    description: z.string().min(1, "Description is Required").min(10, "Description is not enough."),
    typeName: z.string(),
    subTypeName: z.string({required_error: "Please Select Task Type:"}),
    location: z.string().min(1, "Location is required"),
    taskDateTime: z.date(),
})

export const NewTaskFormSchema = z.object({
    description: z.string({required_error: "Description is Required..."}).min(10, "Description is not enough."),
    subTypeName: z.string({required_error: "Please Select Task Type"}),
    location: z.string({required_error: "Address is required..."}).min(1, "Location is required"),
    taskDateTime: z.string({required_error: "Time and date is required..."}),
})

export const ProfileSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.TASKER, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(passwordSchema),
    newPassword: z.optional(passwordSchema),
}).refine((data) => {
    if (data.password && !data.newPassword) {
        return false
    }
    return true
}, {
    message: "New Password is required!",
    path: ["newPassword"]
}).refine((data) => {
    if (!data.password && data.newPassword) {
        return false
    }
    return true 
}, {
    message: "password is required",
    path: ["password"]
})