import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'
import { User } from 'lucide-react'

interface ProfileImageProps {
    image?: string|null; 
}

const ProfileImage: React.FC<ProfileImageProps> = ({ image }) => {
    return (
        <div className='w-full mb-10'>
            <Avatar className=' w-20 h-20 mx-auto '>
                {image ? (
                    <AvatarImage src={image} />
                ) : (
                    <AvatarFallback>
                        <User className=' h-full w-full' />
                    </AvatarFallback>
                )}
            </Avatar>
        </div>
    )
}

export default ProfileImage
