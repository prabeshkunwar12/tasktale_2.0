import React from 'react'

interface PageProps {
    params: {
        taskId: string
    }
}

const TaskPage = ({ params }:PageProps) => {
    const { taskId } = params
    return (
        <div>
            {taskId}
        </div>
    )
}

export default TaskPage
