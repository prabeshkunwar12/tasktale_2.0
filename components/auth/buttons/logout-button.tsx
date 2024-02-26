"use client"

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'
import React from 'react'

const LogoutButton = () => {
    const onClick = () => {
        logout()
    }

    return (
        <span className="cursor-pointer" onClick={onClick}>
            <Button variant="ghost" size="sm">
                Sign Out
            </Button>
        </span>
    )
}

export default LogoutButton