'use server'

import { signIn } from "@/auth"
import { getUserByEmail } from "@/lib/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/token"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z from 'zod'

export const login = async (values:z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid Fields!"}
    }

    const { email, password } = validatedFields.data

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

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
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