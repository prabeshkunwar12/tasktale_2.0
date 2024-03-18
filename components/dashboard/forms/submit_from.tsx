"use client"

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { NewTaskFormSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import * as z from 'zod'

const SubmitForm = () => {
    const [error, setError] = useState("")
    const [open, setOpen] = React.useState(false)
    const [subTypeList, setSubTypeList] = useState<{ name: string, taskTypeName: string }[]>([])
    const router = useRouter()

    const { data } = trpc.getTaskSubTypesTrpc.useQuery();
    
    useEffect(()=>{
        if(data) setSubTypeList(data)
    }, [data])

    const form = useForm<z.infer<typeof NewTaskFormSchema>>({
        resolver: zodResolver(NewTaskFormSchema),
    })

    const { mutate:createTask, isPending } = trpc.createTask.useMutation({
        onSuccess: (task) => {
            if(task) {
                router.push(`dashboard/tasks/${task?.id}`)
            }
            else setError("Task Type Not Found")
            form.reset()
        },
        onError: (error) => {
            setError("Failed to Create Task")
            console.log(error.message)
            form.reset()
        }
    })

    const onSubmit = (values: z.infer<typeof NewTaskFormSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault(); 
        console.log(values);
        //changing the date to UTC time 
        values.taskDateTime = new Date(
            new Date(values.taskDateTime).getTime() - new Date().getTimezoneOffset() * 60000
        ).toISOString();
        createTask(values);
    };
    

    if(!subTypeList) {
        return (
            <Skeleton count={1} />
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col space-y-4'
            >
                <FormField
                    control={form.control}
                    name="subTypeName"
                    render={({ field })=>(
                        <FormItem className='flex flex-col mt-3 space-y-2'>
                            <Popover  open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button 
                                            variant="outline" 
                                            disabled={isPending}
                                            className={cn
                                                ("w-[200px] justify-between",
                                                !field.value && "text-muted-foreground",
                                            )}
                                        >
                                            {field.value ?? "Select The Task"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder='Search Task ...' />
                                        <CommandList>
                                            <CommandGroup>
                                                {subTypeList && subTypeList?.length !== 0 ? (
                                                    subTypeList.map((subType) => (
                                                        <CommandItem
                                                            value={subType.name}
                                                            key={subType.name}
                                                            onSelect={() => {
                                                                form.setValue("subTypeName", subType.name);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    subType.name === field.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {subType.name}
                                                        </CommandItem>
                                                    ))
                                                ) : (
                                                    <CommandEmpty>No Tasks Found.</CommandEmpty>
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field })=>(
                        <FormItem className='flex flex-col mt-3 space-y-2'>
                            <FormControl>
                                <Textarea 
                                    {...field}
                                    placeholder='Enter your description here...'
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field })=>(
                        <FormItem className='flex flex-col mt-3 space-y-2'>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='Enter your address...'
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="taskDateTime"
                    render={({ field })=>(
                        <FormItem className='flex flex-col mt-3 space-y-2'>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={new Date().toISOString()}
                                    disabled={isPending}
                                    type='datetime-local'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    )
}

export default SubmitForm
