import MaxWidthWrapper from "@/components/max_width_wrapper"
import { cn } from "@/lib/utils"

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({children}:ProtectedLayoutProps) => {
    return (
        <div className={cn('min-h-screen font-sans antialiased grainy')}>
            <MaxWidthWrapper className="flex flex-col justify-center text-center">
                {children}
            </MaxWidthWrapper>
        </div>
    )
}

export default ProtectedLayout