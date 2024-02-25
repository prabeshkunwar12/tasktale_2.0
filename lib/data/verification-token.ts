import db from "../db"

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: {email}
        })
        return verificationToken
    } catch {
        return null
    }
} 

export const getVerificationTokenById = async (id: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: {id}
        })
        return verificationToken
    } catch {
        return null
    }
} 