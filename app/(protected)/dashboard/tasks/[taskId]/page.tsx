import React from 'react'

interface PageProps {
    params: {
        taskId: string
    }
}

const TaskPage = ({ params }:PageProps) => {
    const { taskId } = params
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
