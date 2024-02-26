import React from 'react'
import { CardWrapper } from '../wrappers/card-wrapper'
import { BsExclamationTriangle } from 'react-icons/bs'

const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops!Something went wrong!"
            backButtonHref="/login"
            backButtonLabel="Back to Login"
        >
            <div className="w-full flex justify-center items-center">
                <BsExclamationTriangle className="text-destructive" />
            </div>
        </CardWrapper>
    )
}

export default ErrorCard
