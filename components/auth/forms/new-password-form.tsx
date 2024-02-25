"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { CardWrapper } from '../wrappers/card-wrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormError, FormSuccess } from './info'
import { Button } from '@/components/ui/button'
import { NewPasswordSchema } from '@/schemas'
import { newPassword } from '@/actions/new-password'

const NewPasswordForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [isPending, startTransistion]  = useTransition();
    const [error, setError] = useState<string|undefined>("");
    const [success, setSuccess] = useState<string|undefined>("");
    const router = useRouter()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")

        console.log(values)

        startTransistion(()=>{
            newPassword(values, token).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }

    return (
        <CardWrapper
            headerLabel='Enter a New Password'
            backButtonLabel="Back to Login"
            backButtonHref='/login'
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6 text-start'
                >
                    <div className='space-y-4'>
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className='text-xl text-black'>New Password</FormLabel>
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
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type='submit' className='w-full'>
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default NewPasswordForm
