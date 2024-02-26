"use client"
import { useCurrrentUserRole } from "@/lib/hooks/use-current-user"
import { UserRole } from "@prisma/client"
import { FormError } from "./forms/info"

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: UserRole
}

export const RoleGate = ({children, allowedRole}: RoleGateProps) => {
    const role = useCurrrentUserRole()

    if(role !== allowedRole) {
        return (
            <FormError message="You do not have permission to view this content" />
        )
    }

    return (
        <>
            {children}
        </>
    )
}

