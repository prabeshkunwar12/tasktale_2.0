import Link from "next/link"
import { ArrowRight, UserCircle } from "lucide-react"
import { Button, buttonVariants } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useCurrrentUser } from "@/lib/hooks/use-current-user"
import LogoutButton from "../auth/buttons/logout-button"

export const BookNowButton = () => {
    return (
        <Link
            href='/dashboard'
            className={buttonVariants({
                size: 'sm',
            })}>
            Book Now <ArrowRight className='ml-1.5 h-5 w-5' />
        </Link>
    )
}

export const GetStartedButton = () => {
    return (
        <Link
            href='/dashboard'
            className={buttonVariants({
                size: 'sm',
            })}>
            Get Started <ArrowRight className='ml-1.5 h-5 w-5' />
        </Link>
    )
}

export const TasksButton = () => {
    return (
        <Link
            href='/dashboard'
            className={buttonVariants({
                size: 'sm',
                variant: "ghost"
            })}>
            Tasks 
        </Link>
    )
}

export const ProfileButton = () => {
    return (
        <Link
            href='/profile'
            className={buttonVariants({
                size: 'sm',
                variant: "ghost"
            })}>
            Profile
        </Link>
    )
}

export const AvatarButton = () => {
    const user = useCurrrentUser()
    const image = user?.image
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="ghost">
                    <Avatar className=" items-center justify-center">
                        {image ? (
                            <AvatarImage src={image} />
                        ):(
                            <UserCircle className="text-center" />
                        )}
                    </Avatar>
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" flex flex-col items-center justify-center w-min">
                <ProfileButton />
                <LogoutButton />
            </PopoverContent>
        </Popover>
    )
}