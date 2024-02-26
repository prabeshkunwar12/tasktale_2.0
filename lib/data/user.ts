import db from "../db"

export const getUserByEmail = async (email: string) => {
    try {
        const existingUser = await db.user.findUnique({
            where: {email}
        })
        return existingUser
    } catch {
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const existingUser = await db.user.findUnique({
            where: {id}
        })
        return existingUser
    } catch {
        return null
    }
}