"use client"

import { useState } from "react"
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase"
import { useI18n } from "@/lib/i18n"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type AuthMode = "signin" | "signup" | "reset"

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createClient()
  const { t } = useI18n()

  const reset = () => {
    setEmail("")
    setPassword("")
    setError(null)
    setSuccess(null)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/update-password`,
        })
        if (error) throw error
        setSuccess(t("auth.resetEmailSent"))
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}` },
        })
        if (error) throw error
        setSuccess(t("auth.checkEmail"))
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onOpenChange(false)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("auth.error"))
    } finally {
      setLoading(false)
    }
  }

  const getTitle = () => {
    if (mode === "reset") return t("auth.resetPassword")
    if (mode === "signup") return t("auth.createAccount")
    return t("auth.welcomeBack")
  }

  const getDescription = () => {
    if (mode === "reset") return t("auth.resetDesc")
    if (mode === "signup") return t("auth.signUpDesc")
    return t("auth.signInDesc")
  }

  return (
      <Dialog
          open={open}
          onOpenChange={(o) => {
            onOpenChange(o)
            if (!o) {
              reset()
              setMode("signin")
            }
          }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogDescription>{getDescription()}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-1">
            {mode === "reset" && (
                <button
                    type="button"
                    onClick={() => {
                      setMode("signin")
                      reset()
                    }}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t("auth.backToSignIn")}
                </button>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                      id="email"
                      type="email"
                      placeholder={t("auth.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      required
                      disabled={loading}
                      autoComplete="email"
                  />
                </div>
              </div>

              {mode !== "reset" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="password">{t("auth.password")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t("auth.passwordPlaceholder")}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-9 pr-9"
                          required
                          minLength={6}
                          disabled={loading}
                          autoComplete={mode === "signup" ? "new-password" : "current-password"}
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
              )}

              {mode === "signin" && (
                  <div className="text-right">
                    <button
                        type="button"
                        onClick={() => {
                          setMode("reset")
                          reset()
                        }}
                        className="text-xs text-primary hover:underline"
                    >
                      {t("auth.forgotPassword")}
                    </button>
                  </div>
              )}

              {error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
                    {error}
                  </p>
              )}
              {success && (
                  <p className="text-sm text-emerald-400 bg-emerald-500/10 rounded-md px-3 py-2">
                    {success}
                  </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "reset"
                    ? t("auth.sendResetLink")
                    : mode === "signin"
                        ? t("auth.signIn")
                        : t("auth.createAccountBtn")}
              </Button>
            </form>

            {mode !== "reset" && (
                <p className="text-center text-sm text-muted-foreground">
                  {mode === "signin" ? t("auth.noAccount") : t("auth.haveAccount")}{" "}
                  <button
                      type="button"
                      onClick={() => {
                        setMode(mode === "signin" ? "signup" : "signin")
                        reset()
                      }}
                      className="text-primary hover:underline font-medium"
                  >
                    {mode === "signin" ? t("auth.signUpLink") : t("auth.signInLink")}
                  </button>
                </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
  )
}