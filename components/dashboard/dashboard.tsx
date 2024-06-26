import React from 'react'
import CreateTaskButton from './buttons/create-task-button'
import TaskList from './task-list'
import { Cloud } from '../design'

const Dashboard = () => {
    return (
        <main className='mx-auto w-full max-w-7xl md:p-10'>
            <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
                <h1 className='mb-3 font-bold text-5xl text-gray-900'>My Tasks</h1>
                <CreateTaskButton />    
            </div>

            <div className='relative isolate'>
                <Cloud />
 
                <TaskList />

                <Cloud />
            </div>

        </main>
    )
}

export default Dashboard
