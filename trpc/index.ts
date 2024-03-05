import { getTaskByTaskId, getTasksByConsumerId, getTasksByTaskerId } from '@/lib/data/task';
import { privateProcedure, router } from './trpc';
import * as z from 'zod'
import { TRPCError } from '@trpc/server';
import { $Enums } from '@prisma/client';
 
export const appRouter = router({

  getConsumerTasks: privateProcedure.query(({ctx}) =>{
    const {user, userId} = ctx
    return getTasksByConsumerId(userId)
  }),

  getTaskerTasks: privateProcedure.query(({ctx}) =>{
    const {user, userId} = ctx
    return getTasksByTaskerId(userId)
  }),

  getTaskDetailsByConsumer: privateProcedure.input(z.object({ id:z.string() })).query(async ({ctx, input}) => {
    const { user, userId } = ctx
    const taskId = input.id

    const task = await getTaskByTaskId(taskId)

    if(!task) {
      throw new TRPCError({code : "NOT_FOUND"})
    }

    if(task.consumerId !== userId || user.role !== $Enums.UserRole.ADMIN) {
      throw new TRPCError({code: "UNAUTHORIZED"})
    }
    
    return task

  }),

});

export type AppRouter = typeof appRouter;