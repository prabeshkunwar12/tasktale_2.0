import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ReactStars from 'react-stars'
import React from 'react'

interface TaskCardProps {
    id: string
    type: string
    status: string
    image?: string
    description: string
    location: string
    tasker_id?: string|null
    tasker_name?: string
    tasker_pos?: string
    takser_image?: string
    date: string
    price?: string|null
    stars?: number|null
}

const TaskCard = ({
    id,
    type,
    status,
    image,
    description,
    location,
    tasker_id,
    tasker_name,
    takser_image,
    tasker_pos,
    date,
    price,
    stars,
}:TaskCardProps) => {
    const taskLink = `dashboard/tasks/${id}`
    const taskerLink = `dashboard/tasker/${tasker_id ?? '111'}`
    return (
        <Link href={taskLink}>
            <Card className=' mx-auto my-5 bg-slate-100 shadow-lg transition-shadow hover:bg-slate-200 hover:shadow-lg hover:shadow-blue-400'>
                <CardHeader className='flex flex-row items-center justify-between mr-5'>
                    <CardTitle className='truncate overflow-hidden'>{type}</CardTitle>
                    <div className='text-xs'>{status}</div>
                </CardHeader>
                
                <CardContent className='flex flex-col items-center justify-center space-y-4 overflow-hidden'>
                    <Image src={image ?? '/task.jpg'} alt={image ? 'Task image' : 'Alexas_Fotos Handyman pixbay.com'} layout="responsive" width={500} height={200} className='h-auto w-auto rounded-md' />
                    <div className='text-justify line-clamp-3'>{description}</div>
                </CardContent>
                <CardFooter>
                    <Link href={taskerLink} className='flex items-center justify-center w-full bg-blue-100 rounded-md space-x-3 transition-shadow shadow-md hover:bg-white hover:shadow-md hover:shadow-blue-400'>
                        {takser_image ? (
                            <Image src={takser_image} width={10} height={10} alt='tasker image' className=' rounded-full' />
                        ):(
                            <UserCircle className=' w-10 h-10 ' />
                        )}
                        <div>
                            <div className=' text-lg font-semibold overflow-hidden'>{tasker_name}</div>
                            <div className=' text-md overflow-hidden'>{tasker_pos}</div>
                        </div>
                    </Link>
                </CardFooter>
                
                <CardFooter className='text-center text-sm truncate overflow-hidden'>{location}</CardFooter>

                <CardFooter className='flex items-center justify-between space-x-3'>
                    <div className='items-center line-clamp-1'>
                        {format(new Date(date), "d MMM yyyy")}
                    </div>
                    <div className=''>${price}</div>
                    <ReactStars 
                        count={5}
                        value={stars ?? 0}
                        size={20}
                        edit={false}
                    />   
                </CardFooter>
            </Card>
        </Link>
    )
}

export default TaskCard
