import MaxWidthWrapper from "@/components/max_width_wrapper"
import { cn } from "../../lib/utils"

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({children}:AuthLayoutProps) => {
    return (
        <div className={cn('min-h-screen font-sans antialiased grainy')}>
            <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
                {children}
            </MaxWidthWrapper>
        </div>
    )
}

export default AuthLayout