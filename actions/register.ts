'use server'

import { RegisterSchema } from "@/schemas"
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import db from "@/lib/db"
import { getUserByEmail } from "@/lib/data/user"
import { generateVerificationToken } from "@/lib/token"

export const register = async (values:z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid Fields!"}
    }

    const { name, email, password } = validatedFields.data
    const hashedPassword  = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

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

    const verificationToken = await generateVerificationToken(email)

    

    return {success: "Confirmation Email Sent"}
}