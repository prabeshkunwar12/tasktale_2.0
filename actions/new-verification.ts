"use server"

import { getUserByEmail } from "@/lib/data/user"
import { getVerificationTokenByToken } from "@/lib/data/verification-token"
import db from "@/lib/db"

export const newVerification = async (token:string) => {
    const existingToken =  await getVerificationTokenByToken(token)

    if(!existingToken) {
        return {error: "Token not found"}
    }

    const existingTokenExpired = new Date(existingToken.expires) < new Date()
    
    if(existingTokenExpired) {
        return {error: "Token has expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser) {
        return { error: "Email does not exist"}
    }

    await db.user.update({
        where: {id: existingUser.id },
        data: {
            emailVerified: new Date(),
            
            //we also need new verification when user changes their email
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: {id: existingToken.id}
    })

    return { success: "Email Verified"}
}