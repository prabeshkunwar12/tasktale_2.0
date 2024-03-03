import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ReactStars from 'react-stars'
import React from 'react'

interface TaskCardProps {
    id: string,
    type: string;
    status: string;
    image?: string;
    description: string;
    tasker_name?: string;
    tasker_pos?: string;
    takser_image?: string;
    date: string;
    price: string;
    stars?: number;
}

const TaskCard = ({
    id,
    type,
    status,
    image,
    description,
    tasker_name,
    takser_image,
    tasker_pos,
    date,
    price,
    stars,
}:TaskCardProps) => {
  return (
    <Card className=' mx-auto my-5 shadow transistion hover:shadow-lg'>
        <Link href={`dashboard/${id}`} className=''>
            <CardHeader className='flex items-center justify-between mr-5'>
                <CardTitle className='truncate'>{type}</CardTitle>
                <div className='text-xs'>{status}</div>
            </CardHeader>
            
            <CardContent className=' flex flex-col items-center justify-center space-y-4'>
                <Image src={image ?? '/task.jpg'} alt={image ? 'Task image' : 'Alexas_Fotos Handyman pixbay.com'} width={250} height={250} className=' h-auto w-auto' />
                <div className=' text-justify line-clamp-3'>{description}</div>
            </CardContent>
        </Link>
        <CardFooter>
            <div className='flex items-center justify-center w-full bg-zinc-200 rounded-md space-x-3'>
                {takser_image ? (
                    <Image src={takser_image} width={10} height={10} alt='tasker image' className=' rounded-full' />
                ):(
                    <UserCircle className=' w-10 h-10 ' />
                )}
                <div>
                    <div className=' text-lg font-semibold'>{tasker_name}</div>
                    <div className=' text-md'>{tasker_pos}</div>
                </div>
            </div>
        </CardFooter>
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
  )
}

export default TaskCard
