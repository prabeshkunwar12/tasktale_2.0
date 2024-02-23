import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "../button"

export const BookNowButton = () => {
    return (
        <Link
            href='./dashboard'
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
            href='./dashboard'
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
            href='./dashboard'
            className={buttonVariants({
                size: 'sm',
                variant: "ghost"
            })}>
            Tasks 
        </Link>
    )
} 