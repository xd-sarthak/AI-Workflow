import Link from "next/link";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted p-4 sm:p-6">
            <div className="w-full max-w-md space-y-8">
                <div className="flex justify-center">
                    <Link 
                        href="/" 
                        className="flex items-center gap-2 text-lg font-semibold transition-opacity hover:opacity-80"
                    >
                        <Image 
                            src="/weavon.svg" 
                            alt="Weavy Logo" 
                            width={32} 
                            height={32} 
                            priority
                        />
                        <span>Weavy</span>
                    </Link>
                </div>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;