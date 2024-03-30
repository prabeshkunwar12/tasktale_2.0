import { newPassword } from '@/actions/new-password';
import { useCurrrentUser } from '@/lib/hooks/use-current-user'
import React from 'react'

const ProfileForm = () => {
    const user = useCurrrentUser();
    const [isPending, startTransistion] = useTransition()
    const [error, setError] = useState<string|undefined>()
    const [success, setSuccess] = useState<string|undefined>()

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: user?.name ?? undefined,
            email: user?.email ?? undefined,
            password: undefined,
            newPassword: undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
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

export default ProfileForm
