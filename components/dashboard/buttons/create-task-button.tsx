"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'

const CreateTaskButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={(v) => {if(!v) setIsOpen(v)}}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>Create Task</Button>
            </DialogTrigger>

            <DialogContent>
                example content
            </DialogContent>
        </Dialog>
    )
}

export default CreateTaskButton
