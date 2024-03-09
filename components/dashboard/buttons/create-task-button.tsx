"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import SubmitForm from '../forms/submit_from'

const CreateTaskButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={(v) => {if(!v) setIsOpen(v)}}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>Book a New Task</Button>
            </DialogTrigger>

            <DialogContent>
                <SubmitForm />
            </DialogContent>
        </Dialog>
    )
}

export default CreateTaskButton
