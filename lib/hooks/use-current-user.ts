//client side requests
import { useSession } from "next-auth/react";

export const useCurrrentUser = () => {
    const session = useSession()
    if(!session){
        return null
    }
    return session.data?.user
}

export const useCurrrentUserRole = () => {
    const session = useSession()
    if(!session){
        return null
    }
    return session.data?.user?.role
}