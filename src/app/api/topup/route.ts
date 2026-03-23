import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerSupabaseClient()
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const dbUser = await prisma.user.findUnique({
            where: { supabaseId: user.id },
        })

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const body = await request.json()
        const { amount, currency, txId, screenshotUrl } = body

        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
        }

        if (!currency) {
            return NextResponse.json({ error: "Currency is required" }, { status: 400 })
        }

        if (!txId && !screenshotUrl) {
            return NextResponse.json(
                { error: "Provide either a transaction ID or screenshot URL" },
                { status: 400 }
            )
        }

        const topUpRequest = await prisma.topUpRequest.create({
            data: {
                userId: dbUser.id,
                amount: parseFloat(amount),
                currency,
                txId: txId || null,
                screenshotUrl: screenshotUrl || null,
                status: "PENDING",
            },
        })

        return NextResponse.json({
            id: topUpRequest.id,
            status: topUpRequest.status,
            message: "Top-up request submitted. It will be reviewed within 30 minutes.",
        })
    } catch (error) {
        console.error("POST /api/topup error:", error)
        return NextResponse.json({ error: "Failed to submit top-up request" }, { status: 500 })
    }
}

export async function GET(_request: NextRequest) {
    try {
        const supabase = await createServerSupabaseClient()
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const dbUser = await prisma.user.findUnique({
            where: { supabaseId: user.id },
        })

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const requests = await prisma.topUpRequest.findMany({
            where: { userId: dbUser.id },
            orderBy: { createdAt: "desc" },
            take: 20,
        })

        return NextResponse.json(
            requests.map((r) => ({
                ...r,
                amount: r.amount.toString(),
            }))
        )
    } catch (error) {
        console.error("GET /api/topup error:", error)
        return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 })
    }
}