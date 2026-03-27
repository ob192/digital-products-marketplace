"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase"

type Stage = "verifying" | "ready" | "error"

export default function UpdatePasswordPage() {
    const [stage, setStage] = useState<Stage>("verifying")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // The session was already established server-side in /auth/callback via verifyOtp.
        // We just need to confirm the browser client can see it.
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setStage("ready")
            } else {
                // Session not in browser client yet — wait for the PASSWORD_RECOVERY event
                // which Supabase fires when it detects the recovery token in the URL hash
                setStage("error")
            }
        })

        // Also listen for PASSWORD_RECOVERY in case Supabase processes it via URL hash
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "PASSWORD_RECOVERY" && session) {
                setStage("ready")
            }
        })

        return () => subscription.unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirm) { setError("Passwords do not match"); return }
        if (password.length < 6) { setError("Password must be at least 6 characters"); return }

        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.updateUser({ password })
        if (error) { setError(error.message); setLoading(false); return }

        setSuccess(true)
        setTimeout(() => router.push("/"), 2000)
    }

    if (stage === "verifying") {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Verifying your reset link…</span>
                </div>
            </div>
        )
    }

    if (stage === "error") {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="w-full max-w-sm text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
                        <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Link expired or invalid</h1>
                    <p className="text-muted-foreground text-sm mb-6">
                        This password reset link has expired or already been used. Please request a new one.
                    </p>
                    <Button className="w-full" onClick={() => router.push("/")}>
                        Back to homepage
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-2">Set new password</h1>
                <p className="text-muted-foreground text-sm mb-6">Enter your new password below.</p>

                {success ? (
                    <p className="text-sm text-emerald-500 bg-emerald-500/10 rounded-md px-3 py-2">
                        Password updated! Redirecting…
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="password">New password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-9 pr-9"
                                    required
                                    minLength={6}
                                    disabled={loading}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="confirm">Confirm password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirm"
                                    type={showPassword ? "text" : "password"}
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    className="pl-9"
                                    required
                                    minLength={6}
                                    disabled={loading}
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update password
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}