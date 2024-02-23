"use client"

import React from 'react'
import { BookNowButton, TasksButton } from './buttons'

const NavButtons = () => {
    return (
        <div className='hidden items-center space-x-4 sm:flex'>
            <TasksButton />
            <BookNowButton />          
        </div>
    )
}

export default NavButtons
