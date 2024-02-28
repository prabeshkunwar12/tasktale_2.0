"use client"

import React from 'react'
import CreateTaskButton from './buttons/create-task-button'
import { trpc } from '@/app/_trpc/client'
import { BookOpen } from 'lucide-react'

const Dashboard = () => {

    const { data: tasks, isLoading } = trpc.getConsumerTasks.useQuery()

    return (
        <main className='mx-auto max-w-7xl md:p-10'>
            <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
                <h1 className='mb-3 font-bold text-5xl text-gray-900'>My Tasks</h1>
                <CreateTaskButton />    
            </div>

            { tasks && tasks?.length !== 0 ? (
                <div></div>
            ) : isLoading ? (
                <div></div>
            ) : (
                <div className='mt-16 flex flex-col items-center gap-2'>
                    <BookOpen className='h-8 w-8 text-zinc-800' />
                    <h3 className=' font-semibold text-xl'>Your Tale starts here...</h3>
                    <p>Let&apos;s book your first Task.</p>
                </div>
            )}

        </main>
    )
}

export default Dashboard
