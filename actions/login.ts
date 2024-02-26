'use server'

import { signIn } from "@/auth"
import { getTwoFactorConfirmationByUserId } from "@/lib/data/two-factor-confirmation"
import { getTwoFactorTokenByEmail } from "@/lib/data/two-factor-token"
import { getUserByEmail } from "@/lib/data/user"
import db from "@/lib/db"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z from 'zod'

export const login = async (values:z.infer<typeof LoginSchema>, callbackUrl?:string|null) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid Fields!"}
    }

    const { email, password, code } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser?.password) {
        return { error: "Invalid Credentials" }
    }

    //also has similar auth callback if user can bypass this check 
    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email as string)

        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: "Confirmation Email Sent"}
    }

    if(existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
            if(!twoFactorToken)  {
                return { error: "Invalid Code!"}
            }
            if(twoFactorToken.token !== code) {
                return { error: "Invalid Code!"}
            }
            const hasExpired = new Date(twoFactorToken.expires) < new Date()
            if(hasExpired) {
                return { error: "Code Expired!"}
            }

            await db.twoFactorToken.delete({
                where: {id:twoFactorToken.id}
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
            if(existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {id: existingConfirmation.id}
                })
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            })
        } else {
            const twoFactorToken = await generateTwoFactorToken(email)
            await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
            return {twoFactor: true}
        }  
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT
        })
    } catch(error) {
        if(error instanceof AuthError) {
            if(error.type === "CredentialsSignin") return { error: "Invalid Credentials!"}
            return { error: "Something went worng!"}
        }

        throw error
    }

    return {success: "Email Sent"}
}




