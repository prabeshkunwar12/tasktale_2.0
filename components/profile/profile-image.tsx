'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Cloud, File, Loader2, User } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import Dropzone from "react-dropzone"
import { Progress } from '../ui/progress';
import { toast } from "sonner"
import { trpc } from '../../app/_trpc/client';
import { useRouter } from 'next/navigation';
import { generateReactHelpers } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';

const { useUploadThing } =
  generateReactHelpers<OurFileRouter>();

const ProfileImageDropzone = () => {

    const router = useRouter()
    const [isUploading, setIsUploading] = useState<boolean|null>(null)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const { startUpload } = useUploadThing("imageUploader")

    const { mutate:startPolling } = trpc.getFile.useMutation({
        onSuccess: (file) => {
            toast.success("Image uploaded", {
                description: "Profile picture changed"
            })
            window.location.reload()
        },
        onError: (error) => {
            toast.error("Something went wrong", {
                description: "Please try again later"
            })
            router.push("/profile")
        },
        retry: true,
        retryDelay: 500,
    })

    const startSimulatedProgress = () => {
        setUploadProgress(0)
        const interval = setInterval(() => {
            setUploadProgress((prevProgress)=>{
                if(prevProgress >= 95) {
                    clearInterval(interval)
                    return prevProgress
                }
                return prevProgress + 5
            })
        }, 500)
        return interval
    }

    return (
        <Dropzone 
            multiple={false} 
            onDrop={async (acceptedImage)=> {
                setIsUploading(true)
                const progressInterval = startSimulatedProgress()

                const res = await startUpload(acceptedImage)
                if(!res) {
                    toast.error("Something went wrong", {
                        description: "Please try again later"
                    })
                    return 
                }

                //handle submit
                const [fileResponse] = res
                const key = fileResponse?.key
                if(!key) {
                    toast.error("Something went wrong", {
                        description: "Please try again later"
                    })
                    return 
                }

                clearInterval(progressInterval)
                setUploadProgress(100)

                startPolling({ key })
            }}
        >
            {({getRootProps, getInputProps, acceptedFiles}) => (
                <div {...getRootProps()} className='border h-64 m-4 border-dashed border-gray-300 rounded-lg'>
                    <div className='flex items-center justify-center h-full w-full'>
                        <label htmlFor='dropzone-file' className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                                <p className='mb-2 text-sm text-zinc-700'>
                                    <span className='font-semibold'>Click to upload</span>{' '}or drag and drop
                                </p>
                                <p className='text-xs text-zinc-500'>
                                    Image up to &quot;4&quot; MB
                                </p>
                            </div>

                            {acceptedFiles[0] ? (
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
                                <Progress
                                    indicatorColor={uploadProgress === 100 ? 'bg-green-500' : ''}
                                    value={uploadProgress}
                                    className='h-1 w-full bg-zinc-200'
                                />
                                {uploadProgress === 100 ? (
                                    <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
                                    <Loader2 className='h-3 w-3 animate-spin' />
                                        Redirecting...
                                    </div>
                                ) : null}
                                </div>
                            ) : null}

                            
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    )
};


const ProfileImage= () => {
    const { data:image } = trpc.getProfileImageUrl.useQuery()
    return (
        <Dialog>
            <DialogTrigger>
                <Avatar className='mx-auto h-20 w-20'>
                    {image ? (
                        <AvatarImage src={image} className=' h-full w-auto' />
                    ) : (
                        <AvatarFallback>
                            <User className=' h-full w-auto' />
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
