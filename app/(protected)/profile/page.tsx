import { Cloud } from '@/components/design'
import ProfileForm from '@/components/profile/profile-form'

const ProfilePage = () => {
  return (
    <div className='relative isolate'>
        <Cloud />
        <ProfileForm />
        <Cloud />
    </div>
  )
}

export default ProfilePage
