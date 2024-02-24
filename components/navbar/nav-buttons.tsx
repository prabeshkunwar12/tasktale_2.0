"use client"

import React from 'react'
import { BookNowButton, TasksButton } from './buttons'
import LoginButton from '../auth/login-button'
import { Button } from '../ui/button'

const NavButtons = () => {
    return (
        <div className='hidden items-center space-x-4 sm:flex'>
            <TasksButton />
            <LoginButton>
                <Button variant="ghost" size="sm">
                    Sign In
                </Button>
            </LoginButton>  
            <BookNowButton />        
        </div>
    )
}

export default NavButtons
