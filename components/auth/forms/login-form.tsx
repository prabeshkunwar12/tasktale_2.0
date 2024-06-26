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
import { useSearchParams } from 'next/navigation'

const LoginForm = () => {
    const [isPending, startTransistion] = useTransition()
    const [error, setError] = useState<string|undefined>()
    const [success, setSuccess] = useState<string|undefined>()
    const [showTwoFactor, setShowTwoFactor] = useState(false)

    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email Already in use with different provider!":""
    const callbackUrl = searchParams.get("callbackUrl")

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
            login(values, callbackUrl).then((data) => {
                if(data?.error) {
                    form.reset()
                    setError(data?.error)
                } 
                if(data?.success) {
                    form.reset()
                    setSuccess(data?.success)
                }
                if(data?.twoFactor) {
                    setShowTwoFactor(true)
                }
            }).catch(()=>setError("Something went wrong!"))
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
                {!showTwoFactor && (
                    <>
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
                                            autoComplete='email'
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
                                            autoComplete='password'
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
                    </>
                )}
                {showTwoFactor && (
                    <FormField 
                        control={form.control}
                        name="code"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className='text-xl text-black'>Two Factor Code</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder='123456'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                </div>
                <FormError message= {error ?? urlError} />
                <FormSuccess message= {success} />
                <Button type='submit' className='w-full' disabled={isPending}>
                    {showTwoFactor ? "Confirm":"Login"}
                </Button>
            </form>
        </Form>
        </CardWrapper>
    )
}

export default LoginForm
