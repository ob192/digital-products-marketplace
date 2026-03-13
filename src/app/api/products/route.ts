import { NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/products"
import { getCategories } from "@/lib/categories"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const category = searchParams.get("category") || undefined
    const tag = searchParams.get("tag") || undefined
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = Math.min(parseInt(searchParams.get("pageSize") || "12"), 50)

    // category param can be either a slug or id — resolve slug
    let categoryId: string | undefined
    let categorySlug: string | undefined

    if (category) {
      // Try treating it as a slug first
      const found = await prisma.category.findUnique({ where: { slug: category }, select: { id: true } })
      if (found) {
        categorySlug = category
      } else {
        categoryId = category
      }
    }

    const data = await getProducts({
      search,
      categoryId,
      categorySlug,
      tag,
      page,
      pageSize,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error("GET /api/products error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
