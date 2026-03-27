import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 1. Try to find by supabaseId (the happy path)
    let dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
    })

    if (dbUser) {
      // Update email in case it changed
      if (dbUser.email !== user.email!) {
        dbUser = await prisma.user.update({
          where: { id: dbUser.id },
          data: { email: user.email! },
        })
      }
    } else {
      // 2. Maybe a row exists with this email but a different supabaseId (e.g. re-registration)
      const existingByEmail = await prisma.user.findUnique({
        where: { email: user.email! },
      })

      if (existingByEmail) {
        // Claim the row by updating the supabaseId to the current one
        dbUser = await prisma.user.update({
          where: { id: existingByEmail.id },
          data: { supabaseId: user.id },
        })
      } else {
        // 3. Brand new user
        dbUser = await prisma.user.create({
          data: {
            email: user.email!,
            supabaseId: user.id,
            balance: 0,
          },
        })
      }
    }

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