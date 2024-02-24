'use server'

import { RegisterSchema } from "@/schemas"
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import db from "@/lib/db"

export const register = async (values:z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid Fields!"}
    }

    const { name, email, password } = validatedFields.data
    const hashedPassword  = await bcrypt.hash(password, 10)

    const existingUser = await db.user.findUnique({
        where: {email}
    })

    if(existingUser) {
        return { error: "Email is already taken!"}
    }

    await db.user.create({
        data: {
            name, 
            email,
            password: hashedPassword,
        }
    })

    //TODO: send verification token email

    return {success: "Email Sent"}
}