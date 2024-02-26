"use client"

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "../wrappers/card-wrapper";
import { FormError, FormSuccess } from "./info";
import { BeatLoader } from "react-spinners"
import { newVerification } from "@/actions/new-verification";

export const NewVerificationFrom = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if(success || error) return

        if(!token) {
            setError("Missing Token")
            return
        }
        newVerification(token).then((data) => {
            setSuccess(data.success)
            setError(data.error)
        }).catch(() => {
            setError("Something went wrong")
        })
    }, [token, success, error]) 

    useEffect(()=>{
        onSubmit()
    },[onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to Login"
            backButtonHref="/login"
        >
            <div className="flex items-center w-full justify-center">
            {!success && !error && (
            <BeatLoader />
            )}
            <FormSuccess message={success} />
            {!success && (
            <FormError message={error} />
            )}
            </div>
        </CardWrapper>
    )
}