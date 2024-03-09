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

export const getTaskByTaskId = async (taskId:string) => {
    try {
        const task = await db.task.findFirst({
            where: {
                id: taskId,
            }
        })
        return task
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

export const getTaskTypes = async () => {
    try {
        const types = await db.taskType.findMany()
        return types
    } catch {
        return null
    }
}

export const getTaskSubTypes = async () => {
    try {
        const subTypes = await db.taskSubTypes.findMany()
        return subTypes
    } catch {
        return null
    }
}

export const getSubTypesByType = async (taskTypeName:string) => {
    try {
        const subTypes = await db.taskSubTypes.findMany({
            where: {
                taskTypeName
            }
        })
    } catch {
        return null
    }
}

export const getTaskBySubTask = async (subTypeName: string) => {
    try {
        const type = await db.taskSubTypes.findFirst({
            where: {
                name: subTypeName
            }
        })
        return type?.taskTypeName
    } catch {
        return null
    }
}