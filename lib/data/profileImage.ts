import db from "../db"

export const getProfileImageUrl = async (userId:string) => {
    try {
        const image = await db.profileImage.findFirst({
            select: {
                url: true
            },
            where: {
                userId
            }
        })
        if(image) return image.url
        return null
    } catch {
        return null
    }
}

export const getProfileImageKey = async (userId:string) => {
    try {
        const image = await db.profileImage.findFirst({
            select: {
                key: true
            },
            where: {
                userId
            }
        })
        if(image) return image.key
        return null
    } catch {
        return null
    }
}
export const getProfileImageExists = async (userId:string) => {
    try {
        const image = await db.profileImage.findFirst({
            where: {
                userId
            }
        })
        return !!image
    } catch {
        return null
    }
}

export const deleteProfileImage = async (userId:string) => {
    try {
        const image = await db.profileImage.delete({
            where: {
                userId
            }
        })
        return !!image
    } catch {
        return null
    }
}