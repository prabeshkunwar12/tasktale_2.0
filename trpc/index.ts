import { getTasksByConsumerId, getTasksByTaskerId } from '@/lib/data/task';
import { privateProcedure, router } from './trpc';
 
export const appRouter = router({

  getConsumerTasks: privateProcedure.query(({ctx}) =>{
    const {user, userId} = ctx
    return getTasksByConsumerId(userId)
  }),

  getTaskerTasks: privateProcedure.query(({ctx}) =>{
    const {user, userId} = ctx
    return getTasksByTaskerId(userId)
  })

});

export type AppRouter = typeof appRouter;