'use client'
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog } from "../ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react"

export const ProfileImageUploadButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='sm' variant='link'>Upload</Button>
            </DialogTrigger>
            <DialogContent>
                Upload Your Profile picture.
            </DialogContent>
        </Dialog>
    )
}