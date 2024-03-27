"use client"

import { trpc } from '@/app/_trpc/client'
import Skeleton from 'react-loading-skeleton'
import TaskCard from './cards/task-card'
import { ScrollArea } from '../ui/scroll-area'
import { BookOpen } from 'lucide-react'

const TaskList = () => {
    const {data:tasks, isLoading} = trpc.getConsumerTasks.useQuery();
    return (
        <ScrollArea className='mt-8 bg-white/50 h-[550px] rounded-md border sm:mx-3'>
            { tasks && tasks?.length !== 0 ? (
                <ul className=' mt-2 mx-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {tasks.sort(
                        (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    ).map((task) => (
                        <li key={task.id} className='col-span-1 divide-y divide-gray-200 rounded-lg'>
                            <TaskCard 
                                id={task.id} 
                                type={task.subTypeName}
                                status={task.status}
                                description={task.description}
                                location={task.location ?? 'Remote'}
                                tasker_name='John Doe'
                                tasker_pos='Cleaner'
                                date={task.taskDateTime ?? task.createdAt}
                                price={task.price}
                                stars={task.rating}
                            /> 
                        </li>
                    ))}
                </ul>
            ) : isLoading ? (
                <Skeleton height={100} className=' my-2 ' count={3} />
            ) : (
                <div className='mt-16 flex flex-col items-center gap-2'>
                    <BookOpen className='h-8 w-8 text-zinc-800' />
                    <h3 className=' font-semibold text-xl'>Your Tale starts here...</h3>
                    <p>Let&apos;s book your first Task.</p>
                </div>
            )}

        </ScrollArea>
    )
}

export default TaskList