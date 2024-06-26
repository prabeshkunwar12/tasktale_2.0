import { getTaskBySubTask, getTaskByTaskId, getTaskSubTypes, getTaskTypes, getTasksByConsumerId, getTasksByTaskerId } from '@/lib/data/task';
import { privateProcedure, publicProcedure, router } from './trpc';
import * as z from 'zod'
import { TRPCError } from '@trpc/server';
import { $Enums } from '@prisma/client';
import { NewTaskFormSchema } from '@/schemas';
import db from '@/lib/db';
import { getProfileImageUrl } from '@/lib/data/profileImage';
 
export const appRouter = router({

  getConsumerTasks: privateProcedure.query(({ctx}) =>{
    const {userId} = ctx
    return getTasksByConsumerId(userId)
  }),

  getTaskerTasks: privateProcedure.query(({ctx}) =>{
    const {userId} = ctx
    return getTasksByTaskerId(userId)
  }),

  getTaskDetailsByConsumer: privateProcedure.input(z.object({ id:z.string() })).query(async ({ctx, input}) => {
    const { user, userId } = ctx
    const taskId = input.id

    const task = await getTaskByTaskId(taskId)

    if(!task) {
      throw new TRPCError({code : "NOT_FOUND"})
    }

    if(task.consumerId !== userId && user.role !== $Enums.UserRole.ADMIN) {
      throw new TRPCError({code: "UNAUTHORIZED"})
    }
    
    return task
  }),

  getTaskTypesTrpc: publicProcedure.query(async () => {
    const types =  await getTaskTypes();
    if(!types) return null
    return types
  }),

  getTaskSubTypesTrpc: publicProcedure.query(async () => {
    const subTypes =  await getTaskSubTypes();
    if(!subTypes) return null
    return subTypes
  }),

  createTask: privateProcedure.input(NewTaskFormSchema).mutation(async ({ctx, input})=> {
    const { userId } = ctx
    const { description, subTypeName, location, taskDateTime } = input

    const typeName = await getTaskBySubTask(subTypeName)

    if(!typeName) {
      return null
    }

    if(new Date()>new Date(taskDateTime)) {
      throw new Error('Date and time submitted is before the current date')
    }

    const task = await db.task.create({
      data: {
        description,
        typeName,
        subTypeName,
        location,
        status:$Enums.TaskStatus.POSTED,
        consumerId:userId,
        taskDateTime:taskDateTime
      }
    })
    return task
  }),

  getFile: privateProcedure.input(z.object({key:z.string()})).mutation(async ({ctx, input}) => {
    const {userId} = ctx
    const image = await db.profileImage.findFirst({
      where: {
        key: input.key,
        userId
      }
    })

    if(!image) throw new TRPCError({code : "NOT_FOUND"})

    return image
  }),

  getProfileImageUrl: privateProcedure.query( async ({ctx}) => {
    const {userId} = ctx
    return await getProfileImageUrl(userId)  
  })

});

export type AppRouter = typeof appRouter;