"use client"

import React, { useState, useTransition } from 'react'
import { CardWrapper } from '@/components/auth/wrappers/card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FormError, FormSuccess } from './info'
import { login } from '@/actions/login'

const LoginForm = () => {
    const [isPending, startTransistion] = useTransition()
    const [error, setError] = useState<string|undefined>()
    const [success, setSuccess] = useState<string|undefined>()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        startTransistion(() => {
            login(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })  
    }
    return (
        <CardWrapper 
            headerLabel='Welcome Back'
            backButtonLabel="Don't have an account?"
            backButtonHref='/register'
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
                            <Button
                                size="sm"
                                variant="link"
                                asChild
                                className='px-0 font-normal'
                            >
                                <Link href="/reset">Forgot Password</Link>
                            </Button>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <FormError message= {error} />
                <FormSuccess message= {success} />
                <Button type='submit' className='w-full' disabled={isPending}>
                    Login
                </Button>
            </form>
        </Form>
        </CardWrapper>
    )
}

export default LoginForm
