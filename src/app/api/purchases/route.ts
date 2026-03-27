import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
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

        const dbUser = await prisma.user.findUnique({
            where: { supabaseId: user.id },
        })

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const purchases = await prisma.purchase.findMany({
            where: { userId: dbUser.id },
            include: {
                product: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        image: true,
                        category: { select: { name: true, slug: true } },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            take: 50,
        })

        return NextResponse.json(
            purchases.map((p) => ({
                ...p,
                price: p.price.toString(),
            }))
        )
    } catch (error) {
        console.error("GET /api/purchases error:", error)
        return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 })
    }
}