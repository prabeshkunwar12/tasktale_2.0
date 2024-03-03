"use client"

import { trpc } from '@/app/_trpc/client'
import { format } from 'date-fns'
import { BookOpen, Plus, Star, UserCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useTransition } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

const TaskList = () => {
    const {data:tasks, isLoading} = trpc.getConsumerTasks.useQuery();
    return (
        <div>
            { tasks && tasks?.length !== 0 ? (
                <ul className=' mt-8 mx-5 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
                    {tasks.sort(
                        (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    ).map((task) => (
                        <li key={task.id} className='col-span-1 divide-y divide-gray-200 rounded-lg'>
                            <Card className=' mx-auto my-5 shadow transistion hover:shadow-lg'>
                                <Link href={`dashboard/${task.id}`} className='flex items-center justify-between mr-5'><CardHeader><CardTitle className='truncate'>{task.type}</CardTitle></CardHeader><div className='text-xs'>{task.status}</div></Link>
                                <CardContent className=' flex flex-col items-center justify-center space-y-4'>
                                    <Image src="/task.jpg" alt='Alexas_Fotos Handyman pixbay.com' width={250} height={250} />
                                    <div className='flex justify-between'>
                                        <div className=' flex flex-col space-y-4'>
                                            <div className=' text-justify line-clamp-3'>{task.description}</div>
                                            <div className='flex items-center justify-center w-full bg-zinc-200 rounded-md space-x-3'>
                                                <UserCircle className=' w-10 h-10 ' />
                                                <div>
                                                    <div className=' text-lg font-semibold'>John Doe</div>
                                                    <div className=' text-md'>Professional Cleaner</div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </CardContent>
                                <CardFooter className='flex items-center justify-between space-x-3'>
                                    <div className='items-center line-clamp-1'>
                                        {format(new Date(task.createdAt), "d MMM yyyy")}
                                    </div>
                                    <div className=''>$100</div>
                                    <div className='flex items-center'>
                                        <Star className='w-5 h-5'/>
                                        <Star className='w-5 h-5'/>
                                        <Star className='w-5 h-5'/>
                                        <Star className='w-5 h-5'/>
                                        <Star className='w-5 h-5'/>
                                    </div>
                                </CardFooter>
                            </Card>
                        </li>
                    ))}
                </ul>
            ) : isLoading ? (
                <Skeleton height={100} className=' my-2 ' count={3} />
            ) : (
                <div className='mt-16 flex flex-col items-center gap-2'>
                    <BookOpen className='h-8 w-8 text-zinc-800' />
                    <h3 className=' font-semibold text-xl'>Your Tale starts here...</h3>
                    <p>Let&apos;s book your first Task.</p>
                </div>
            )}

        </div>
    )
}

export default TaskList
