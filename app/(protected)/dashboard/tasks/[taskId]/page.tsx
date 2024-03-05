import { trpc } from '@/app/_trpc/client'
import React from 'react'

interface PageProps {
    params: {
        taskId: string
    }
}

const TaskPage = ({ params }:PageProps) => {
    const { taskId } = params

    const { data:task, isLoading } = trpc.getConsumerTasks.useQuery()

    return (
        <>
            <h1>Task</h1>
            <div>
                {taskId}
            </div>
        </>
    )
}

export default TaskPage
