'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Cloud, User } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import Dropzone from "react-dropzone"
import { Progress } from '../ui/progress';
import { useUploadThing } from '@/lib/hooks/uploadThing';
import { toast } from "sonner"
import { trpc } from '@/app/_trpc/client';

interface ProfileImageProps {
    image?: string|null; 
}

const ProfileImageDropzone = () => {
    const [isUploading, setIsUploading] = useState<boolean | null>(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const { startUpload } = useUploadThing("imageUploader")

    const { mutate:startPolling } = trpc.getFile.useMutation({
        onSuccess: () => {
            toast.success("image uploaded")
        },
        retry: true,
        retryDelay: 500
    })

    const handleDrop = async (acceptedFiles:File[]) => {
        const file = acceptedFiles[0];
        setIsUploading(true);

        const reader = new FileReader();
        reader.onload = () => {
            setIsUploading(false);
            setUploadedImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        const res = await startUpload(acceptedFiles)
        
        if(!res) {
            return toast.error("Something went wrong", {
                description: "Please try again later",
            })
        }

        const [fileResponse] = res
        const key = fileResponse?.key
        if(!key) {
            return toast.error("Something went wrong", {
                description: "Please try again later",
            })
        }

        startPolling({ key })
    };

    return (
        <Dropzone multiple={false} onDrop={(acceptedFile) => handleDrop(acceptedFile)}>
            {({getRootProps, getInputProps, acceptedFiles}) => (
                <div {...getRootProps()} className='border h-96 m-4 border-dashed border-gray-300 rounded-lg'>
                    <div className='relative h-full'>
                        {uploadedImage ? (
                            <img src={uploadedImage} alt="Uploaded" className="w-full h-full rounded-full" />
                        ) : (
                            <div className='flex items-center justify-center h-full'>
                                <label htmlFor='dropzone-profile-image' className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
                                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                        <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                                        <p className='mb-2 text-sm text-zinc-700'>
                                            <span className='font-semibold'>Click to upload</span>{' '} or drag and drop
                                        </p> 
                                        <p className='text-xs text-zinc-500'>Profile Picture (up to 4MB) </p>
                                    </div>
                                </label>
                            </div>
                        )} 

                        {isUploading && (
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='w-full max-w-xs mx-auto'>
                                    <Progress 
                                        value={50} 
                                        className='h-1 w-full bg-zinc-200'
                                    />
                                </div>
                            </div>
                        )}

                        <input {...getInputProps} type='file' id='dropzone-file' className='hidden' />
                    </div>
                </div> 
            )}
        </Dropzone>
    );
};


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
