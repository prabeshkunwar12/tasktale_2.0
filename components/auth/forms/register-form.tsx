"use client"

import React, { useState, useTransition } from 'react'
import { CardWrapper } from '@/components/auth/wrappers/card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas/index'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError, FormSuccess } from './info'
import { register } from '@/actions/register'

const RegisterForm = () => {
    const [isPending, startTransistion] = useTransition()
    const [error, setError] = useState<string|undefined>()
    const [success, setSuccess] = useState<string|undefined>()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")
        startTransistion(() => {
            register(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })  
    }
    return (
        <CardWrapper 
            headerLabel='Register'
            backButtonLabel="Already have an account?"
            backButtonHref='/login'
            showSocial
        >
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6 text-start'
            >
            <div className='space-y-4'>
                <FormField 
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className='text-xl text-black'>name</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder='john Doe'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />      
                <FormField 
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className='text-xl text-black'>Email</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder='john.doe@example.com'
                                    type="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className='text-xl text-black'>Password</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder='********'
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <FormError message= {error} />
                <FormSuccess message= {success} />
                <Button type='submit' className='w-full' disabled={isPending}>
                    Create an Account
                </Button>
            </form>
        </Form>
        </CardWrapper>
    )
}

export default RegisterForm
