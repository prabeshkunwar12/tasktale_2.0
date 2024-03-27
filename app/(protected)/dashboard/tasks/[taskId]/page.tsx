"use client"

import { trpc } from '@/app/_trpc/client'
import ProgressBar from '@/components/dashboard/cards/progressbar'
import SubmitForm from '@/components/dashboard/forms/submit_from'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useCurrrentUser, useCurrrentUserRole } from '@/lib/hooks/use-current-user'
import { $Enums } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import SubmittingPage from '../../submit/page'

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
    const statusEnum = $Enums.TaskStatus
    let statusPage = null;

    

    if(isLoading) {
        return (
            <div>
                <Skeleton height={300} className=' my-2 ' count={6} />
            </div>
        )
    } else if(!task) {
        return (
            <div className='items-center justify-center text-center mt-10'>
                <Card className=' bg-destructive text-destructive-foreground m-auto w-[500px]'>
                    <CardHeader>!!TASK NOT FOUND!!</CardHeader>
                    <CardContent>The Task does not exist!!</CardContent>
                </Card>
            </div>
        )
    }

    if(!user || (task?.consumerId !== user.id && userRole !== $Enums.UserRole.ADMIN)) {
        return (
            <div className='items-center justify-center text-center mt-10'>
                <Card className=' bg-destructive text-destructive-foreground m-auto w-[500px]'>
                    <CardHeader>!!UNAUTHORIZED!!</CardHeader>
                    <CardContent>You are not authorized to view this page!!</CardContent>
                </Card>
            </div>
        )
    }

    switch(task.status) {
        case statusEnum.SUBMITTING:
            return (
                <div>
                    <ProgressBar steps={5} currentStep={0} />
                    <SubmittingPage />
                </div>
            )
        case statusEnum.FAILED:
            statusPage =  <FailedPage />
            break
        case statusEnum.POSTED:
            return (
                <div>
                    <ProgressBar steps={5} currentStep={1} />
                    <FindingTaskerPage />
                </div>
            )
        case statusEnum.ACCPTED:
            return (
                <div>
                    <ProgressBar steps={5} currentStep={2} />
                    <PaymentPage />
                </div>
            )
        case statusEnum.PAID:
            return (
                <div>
                    <ProgressBar steps={5} currentStep={3} />
                    <DiscussionPage />
                </div>
            )
        case statusEnum.COMPLETED:
            return (
                <div>
                    <ProgressBar steps={5} currentStep={4} />
                    <RatingPage />
                </div>
            )
        case statusEnum.RATED:
            return (
                <div>
                    <ProgressBar steps={5} currentStep={5} />
                    <TaskDetailsPage />
                </div>
            )
    }

}

const FailedPage = () => {
    return (
        <div>
            FailedPage
        </div>
    )
}

const FindingTaskerPage = () => {
    return (
        <div>
            <div>
                FindingTaskerPage
            </div>
        </div>
        
    )
}
const PaymentPage = () => {
    return (
        <div>
            <div>
                Payment Page
            </div>
        </div>
    )
}
const DiscussionPage = () => {
    return (
        <div>
            <div>
                Discussion Page
            </div>
        </div>
    )
}
const RatingPage = () => {
    return (
        <div>
            <div>
                Rating page
            </div>
        </div>
    )
}
const TaskDetailsPage = () => {
    return (
        <div>
            <div>
                Task Details page
            </div>
        </div>
    )
}

export default TaskPage
