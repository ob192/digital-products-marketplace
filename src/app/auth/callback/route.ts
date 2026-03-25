import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const tokenHash = searchParams.get("token_hash")
    const type = searchParams.get("type") as string | null
    const next = searchParams.get("next") ?? "/"
    const errorRedirect = NextResponse.redirect(`${origin}/auth/error`)

    // token_hash flow — works across browsers/devices, no PKCE verifier needed
    if (tokenHash && type) {
        const cookieStore = await cookies()

        const successResponse =
            type === "recovery"
                ? NextResponse.redirect(`${origin}/auth/update-password`)
                : NextResponse.redirect(`${origin}${next}`)

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                            successResponse.cookies.set(name, value, options as never)
                        })
                    },
                },
            }
        )

        const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as "recovery" | "email" | "signup" | "invite" | "magiclink" | "email_change",
        })

        if (error) {
            console.error("verifyOtp error:", error.message)
            return errorRedirect
        }

        if (data.user) {
            // Upsert user for all flows except recovery (recovery just sets the session)
            if (type !== "recovery") {
                try {
                    await prisma.user.upsert({
                        where: { supabaseId: data.user.id },
                        update: { email: data.user.email! },
                        create: {
                            email: data.user.email!,
                            supabaseId: data.user.id,
                            balance: 0,
                        },
                    })
                } catch (dbError) {
                    console.error("Failed to upsert user:", dbError)
                }
            }
            return successResponse
        }

        return errorRedirect
    }

    // PKCE code flow — OAuth, or same-browser email confirmation
    if (code) {
        const cookieStore = await cookies()
        const redirectResponse = NextResponse.redirect(`${origin}${next}`)

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                            redirectResponse.cookies.set(name, value, options as never)
                        })
                    },
                },
            }
        )

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error("exchangeCodeForSession error:", error.message)
            return errorRedirect
        }

        if (data.user) {
            try {
                await prisma.user.upsert({
                    where: { supabaseId: data.user.id },
                    update: { email: data.user.email! },
                    create: {
                        email: data.user.email!,
                        supabaseId: data.user.id,
                        balance: 0,
                    },
                })
            } catch (dbError) {
                console.error("Failed to upsert user:", dbError)
            }
            return redirectResponse
        }
    }

    return errorRedirect
}