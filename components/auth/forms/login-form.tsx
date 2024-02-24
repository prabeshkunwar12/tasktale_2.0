import React from 'react'
import { CardWrapper } from '@/components/auth/wrappers/card-wrapper'

const LoginForm = () => {
  return (
    <CardWrapper 
        headerLabel='Welcome Back'
        backButtonLabel="Don't have an account?"
        backButtonHref='/register'
        showSocial
    >
        Login Form
    </CardWrapper>
  )
}

export default LoginForm
