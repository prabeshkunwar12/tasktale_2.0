'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Cloud, File, User } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import Dropzone from "react-dropzone"

interface ProfileImageProps {
    image?: string|null; 
}

const ProfileImageDropzone = () => {

    const [isUploading, setIsUploading] = useState<boolean | null>(true)

    return (
        <Dropzone multiple={false} onDrop={(acceptedFile)=>{console.log(acceptedFile)}}>
            {({getRootProps, getInputProps, acceptedFiles}) => (
                <div {...getRootProps()} className='border h-64 m-4 border-dashed border-gray-300 rounded-lg'>
                        <div className='flex items-center justify-center h-full w-full'>
                            <label htmlFor='dropzone-profile-image' className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
                                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                    <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                                    <p className='mb-2 text-sm text-zinc-700'>
                                        <span className='font-semibold'>Click to upload</span>{' '} or drag and drop
                                    </p> 
                                    <p className='text-xs text-zinc-500'>Image (up tp 4MB) </p>
                                </div>

                                {acceptedFiles && acceptedFiles[0] ? (
                                    <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                                        <div className='px-3 py-2 h-full grid place-items-center'>
                                            <File className='h-4 w-4 text-blue-500' />
                                        </div>
                                        <div className='px-3 py-2 h-full text-sm truncate'>
                                            {acceptedFiles[0].name}
                                        </div>
                                    </div>
                                ) : null}

                                {isUploading ? (
                                    <div className='w-full mt-4 max-w-xs mx-auto'>
                                        
                                    </div>
                                ):null}
                            </label>
                        </div>
                </div> 
            )}
        </Dropzone>
    )
}

const ProfileImage: React.FC<ProfileImageProps> = ({ image }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Avatar className=' w-20 h-20 mx-auto'>
                    {image ? (
                        <AvatarImage src={image} />
                    ) : (
                        <AvatarFallback>
                            <User className=' h-full w-full' />
                        </AvatarFallback>
                    )}
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <ProfileImageDropzone />
            </DialogContent>
        </Dialog>
    )
}

export default ProfileImage
