'use server'

import { currentUser } from '@/lib/current-user'
import { getUserByEmail, getUserById } from '@/lib/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/token'
import { ProfileSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import * as z from 'zod'
import db from '@/lib/db'

export const profile = async (values: z.infer<typeof ProfileSchema>) => {
    const user =  await currentUser();
    if(!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id as string)

    if (!dbUser) {
        return { error: "Unauthorized"}
    }

    if (user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    }

    // change in email
    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        if(existingUser && existingUser.id !== user.id) {
            return { error:"Email already in use!"}
        }

        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: "Verification email sent!"}
    }

    // change in password
    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password)
        if(!passwordMatch) return {error: 'Incorrect Password!'}
        const hashedPassword = await bcrypt.hash(values.password, 10)
        values.password = hashedPassword
        values.newPassword = undefined
    }

    await db.user.update({
        where: {id: dbUser.id},
        data: { ...values },
    })
}


