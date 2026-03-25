import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Authentication error</h1>
                <p className="text-muted-foreground text-sm mb-6">
                    The link may have expired or already been used. Please try again.
                </p>
                <Button asChild className="w-full">
                    <Link href="/">Go to homepage</Link>
                </Button>
            </div>
        </div>
    )
}