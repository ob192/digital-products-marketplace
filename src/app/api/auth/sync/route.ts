import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { prisma } from "@/lib/prisma"

export async function POST(_request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const dbUser = await prisma.user.upsert({
      where: { supabaseId: user.id },
      update: { email: user.email! },
      create: {
        email: user.email!,
        supabaseId: user.id,
        balance: 0,
      },
    })

    return NextResponse.json({
      id: dbUser.id,
      email: dbUser.email,
      balance: dbUser.balance.toString(),
    })
  } catch (error) {
    console.error("POST /api/auth/sync error:", error)
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 })
  }
}
