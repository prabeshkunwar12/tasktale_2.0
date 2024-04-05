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