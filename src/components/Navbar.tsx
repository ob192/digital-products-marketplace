"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, Menu, X, User, LogOut, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/AuthModal"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { createClient } from "@/lib/supabase"
import { useI18n } from "@/lib/i18n"
import { formatPrice } from "@/lib/utils"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const { t } = useI18n()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) fetchBalance()
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchBalance()
      } else {
        setBalance(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/auth/sync", { method: "POST" })
      if (res.ok) {
        const data = await res.json()
        setBalance(parseFloat(data.balance ?? "0"))
      }
    } catch {
      // silent
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setBalance(null)
    router.refresh()
  }

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.products") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity shrink-0"
          >
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline">DigitalHub</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <LanguageSwitcher />
            {user ? (
              <div className="flex items-center gap-2">
                {balance !== null && (
                  <div className="flex items-center gap-1.5 text-sm bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
                    <Wallet className="h-3.5 w-3.5" />
                    <span>{formatPrice(balance)}</span>
                  </div>
                )}
                <span className="text-sm text-muted-foreground truncate max-w-[140px]">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut} title={t("nav.signOut")}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => setAuthOpen(true)}>
                <User className="h-4 w-4 mr-2" />
                {t("nav.signIn")}
              </Button>
            )}
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-2">
            {user && balance !== null && (
              <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary rounded-full px-2.5 py-1 font-medium">
                <Wallet className="h-3 w-3" />
                <span>{formatPrice(balance)}</span>
              </div>
            )}
            <button
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95">
            <div className="container px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border/50 mt-1 flex items-center justify-between px-2">
                <LanguageSwitcher />
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                      {user.email}
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      setAuthOpen(true)
                      setIsOpen(false)
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t("nav.signIn")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  )
}
