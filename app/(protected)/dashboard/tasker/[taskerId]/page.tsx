import React from 'react'

interface PageProps {
    params: {
        taskerId: string
    }
}

const TaskerPage = ({ params }:PageProps) => {
    const { taskerId } = params
    return (
        <>
            <h1>Tasker</h1>
            <div>
                {taskerId}
            </div>
        </>
    )
}

export default TaskerPage
