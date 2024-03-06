"use client"

import { trpc } from '@/app/_trpc/client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useCurrrentUser, useCurrrentUserRole } from '@/lib/hooks/use-current-user'
import { $Enums } from '@prisma/client'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

interface PageProps {
    params: {
        taskId: string
    }
}

const TaskPage = ({ params }:PageProps) => {
    const { taskId } = params
    const user = useCurrrentUser()
    const userRole = useCurrrentUserRole()
    const { data:task, isLoading } = trpc.getTaskDetailsByConsumer.useQuery({id:taskId})

    if(isLoading) {
        return (
            <div>
                <Skeleton height={300} className=' my-2 ' count={6} />
            </div>
        )
    }

    if(!user || (task?.consumerId !== user.id && user.role !== $Enums.UserRole.ADMIN)) {
        return (
            <div className='items-center justify-center text-center mt-10'>
                <Card className=' bg-destructive text-destructive-foreground m-auto w-[500px]'>
                    <CardHeader>!!UNAUTHORIZED!!</CardHeader>
                    <CardContent>You are not authorized to view this page!!</CardContent>
                </Card>
            </div>
        )
    }

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
