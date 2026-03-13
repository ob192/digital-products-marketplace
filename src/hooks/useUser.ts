"use client"

import { useEffect, useState, useCallback } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase"

interface UseUserReturn {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  syncUser: () => Promise<void>
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const syncUser = useCallback(async () => {
    try {
      await fetch("/api/auth/sync", { method: "POST" })
    } catch (err) {
      console.error("Failed to sync user:", err)
    }
  }, [])

  useEffect(() => {
    // Get initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)

        // Sync to Postgres on sign in
        if (event === "SIGNED_IN" && session?.user) {
          await syncUser()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [syncUser])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return { user, loading, signOut, syncUser }
}
