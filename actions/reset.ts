"use server"

import { getUserByEmail } from '@/lib/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/token'
import { ResetSchema } from '@/schemas'
import * as z from 'zod'


export const reset= async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success) {
        return { error: "Invalid Email!"}
    } 

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser) {
        return { error : 'Email does not exist!'}
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

    return { success : "Reset Email Sent!"}
}