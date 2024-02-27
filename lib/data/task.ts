import { takeCoverage } from "v8"
import db from "../db"

export const getTasksByTaskerId = async (id:string) => {
    try {
        const tasks = await db.task.findMany({
            where: {
                taskerId: id
            }
        })
        return tasks
    } catch {
        return null
    }
}

export const getTasksByConsumerId = async (id:string) => {
    try {
        const tasks = await db.task.findMany({
            where: {
                consumerId: id
            }
        })
        return tasks
    } catch {
        return null
    }
}

export const getImagesByTaskId = async (id:string) => {
    try {
        const images = await db.taskImage.findMany({
            where: {
                taskId: id
            }
        })
        return images
    } catch {
        return null
    }
}