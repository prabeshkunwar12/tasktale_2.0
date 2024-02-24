'use server'

import { getUserByEmail } from "@/lib/data/user"
import { LoginSchema } from "@/schemas"
import bcrypt from 'bcryptjs'
import * as z from 'zod'

export const login = async (values:z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid Fields!"}
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser ?? existingUser?.password) {
        return {error: "Invalid credentials!"}
    }

    const passwordMatch = bcrypt.compare(password, existingUser?.password as string)

    return {success: "Email Sent"}
}