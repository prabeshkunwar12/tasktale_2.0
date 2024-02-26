"use client"

import React from 'react'
import { BookNowButton, TasksButton } from './buttons'
import {LoginButton} from '../auth/buttons/login-button'

const NavButtons = () => {
    return (
        <div className='hidden z-40 items-center space-x-4 sm:flex'>
            <TasksButton />
            <LoginButton mode='modal' asChild />
            <BookNowButton />        
        </div>
    )
}

export default NavButtons
