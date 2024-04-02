"use client"

import { profile } from "@/actions/profile";
import { useCurrrentUser } from "@/lib/hooks/use-current-user";
import { ProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { UserRole } from "@prisma/client";
import { Switch } from "../ui/switch";
import { FormError, FormSuccess } from "../auth/forms/info";
import { Button } from "../ui/button";
import * as z from 'zod';
import ProfileImage from "./profile-image";

const SettingsPage = () => {
    const user = useCurrrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name ?? undefined,
            email: user?.email ?? undefined,
            role: user?.role ?? undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled ?? undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
        startTransition(() => {
        profile(values)
            .then((data) => {
            if (data?.error) {
                setError(data.error);
            }

            if (data?.success) {
                update();
                setSuccess(data.success);
            }
            })
            .catch(() => setError("Something went wrong!"));
        });
    }

    if (!user) {
        return null;
    }

    return ( 
        <Card className="mx-auto mt-20 w-[600px] max-w-7xl md:p-10 bg-white/50">
            <CardHeader>
                <ProfileImage image={user.image} />
            </CardHeader>
            <CardContent>
                
                <Form {...form}>
                    <form 
                        className="space-y-6" 
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-md">Name</FormLabel>
                                    <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="John Doe"
                                        defaultValue={user?.name ?? undefined}
                                        disabled={isPending}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">Email</FormLabel>
                                        <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="john.doe@example.com"
                                            defaultValue={user?.email ?? undefined}
                                            type="email"
                                            disabled={isPending}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">Password</FormLabel>
                                        <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isPending}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">New Password</FormLabel>
                                        <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isPending}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </>
                            )}
                            {user?.role === UserRole.ADMIN && (
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">Role</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={user?.role}
                                        >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" className="text-center" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                            <SelectItem value={UserRole.USER}> User</SelectItem>
                                            <SelectItem value={UserRole.TASKER}>Tasker</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            )}
                            {user?.isOAuth === false && (
                                <FormField
                                    control={form.control}
                                    name="isTwoFactorEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Two Factor Authentication</FormLabel>
                                                <FormDescription>
                                                    Enable two factor authentication for your account
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
 
export default SettingsPage;