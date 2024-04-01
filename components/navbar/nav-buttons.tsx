"use client"

import React from 'react'
import { AvatarButton, BookNowButton, TasksButton } from './buttons'
import {LoginButton} from '../auth/buttons/login-button'
import { useCurrrentUser } from '@/lib/hooks/use-current-user'

const NavButtons = () => {
    const currentUser = useCurrrentUser()
    if(currentUser) {
        return(
            <div className='hidden z-40 items-center space-x-4 sm:flex'>
                <TasksButton />
                <AvatarButton />
                <BookNowButton />  
            </div>
        )
    }
    return (
        <div className='hidden z-40 items-center space-x-4 sm:flex'>
            <TasksButton />
            <LoginButton mode='modal' asChild />
            <BookNowButton />        
        </div>
    )
}

export default NavButtons
