import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import { ProfileImageUploadButton } from './buttons';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

interface ProfileImageProps {
    image?: string|null; 
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
                Upload Your Profile picture.
            </DialogContent>
        </Dialog>
    )
}

export default ProfileImage
