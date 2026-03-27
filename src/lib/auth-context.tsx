"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useRef,
} from "react"
import type {ReactNode} from "react"
import type {User} from "@supabase/supabase-js"
import {createClient} from "@/lib/supabase"

interface AuthContextValue {
    user: User | null
    balance: number | null
    loading: boolean
    signOut: () => Promise<void>
    refreshBalance: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    balance: null,
    loading: true,
    signOut: async () => {
    },
    refreshBalance: async () => {
    },
})

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [balance, setBalance] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const fetchingRef = useRef(false)

    const refreshBalance = useCallback(async () => {
        if (fetchingRef.current) return
        fetchingRef.current = true
        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) return

            const res = await fetch("/api/auth/sync", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            })
            if (res.ok) {
                const data = await res.json()
                setBalance(parseFloat(data.balance ?? "0"))
            }
        } catch {
            // silent
        } finally {
            fetchingRef.current = false
        }
    }, [supabase])

    useEffect(() => {
        // Hydrate from the existing session on mount
        supabase.auth.getUser().then(({data}) => {
            setUser(data.user)
            if (data.user) refreshBalance()
            setLoading(false)
        })

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)

            if (
                session?.user &&
                (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")
            ) {
                refreshBalance()
            }

            if (!session?.user) {
                setBalance(null)
            }

            setLoading(false)
        })

        return () => subscription.unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const signOut = useCallback(async () => {
        await supabase.auth.signOut()
        setUser(null)
        setBalance(null)
    }, [supabase])

    return (
        <AuthContext.Provider value={{user, balance, loading, signOut, refreshBalance}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}