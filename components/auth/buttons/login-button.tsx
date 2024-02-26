"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import LoginForm from "../forms/login-form"
import { Button } from "@/components/ui/button"

interface LoginButtonProps {
    mode?: "modal"|"redirect"
    asChild?: boolean
}

export const LoginButton = ({mode="redirect", asChild}:LoginButtonProps) => {
    const router = useRouter()

    const onClick = () => {
        router.push("/login")
    }

    if(mode==="modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    <Button variant='ghost' size='sm' hidden={true}>
                        Sign In
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-auto bg-transparent border-none">
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <span className="cursor-pointer" onClick={onClick}>
            <Button variant="ghost" size="sm">
                Sign In
            </Button>
        </span>
    )
}
