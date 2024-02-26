import React from 'react'
import { BsCheck2Circle, BsExclamationTriangle } from 'react-icons/bs';

interface InfoProps {
    message?: string;
}

export const FormError = ({message,}:InfoProps) => {
    if(!message) {
        return null;
    }
    return (
        <div className=' bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
            <BsExclamationTriangle className='h-4 w-4' />
            <p>{message}</p>
        </div>
    )
}

export const FormSuccess = ({message,}:InfoProps) => {
    if(!message) {
        return null;
    }
    return (
        <div className=' bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
            <BsCheck2Circle className='h-4 w-4' />
            <p>{message}</p>
        </div>
    )
}
