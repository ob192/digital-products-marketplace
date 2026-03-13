import { NextRequest, NextResponse } from "next/server"
import { getCategoryBySlug } from "@/lib/categories"
import { getProducts } from "@/lib/products"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const category = await getCategoryBySlug(params.slug)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = Math.min(parseInt(searchParams.get("pageSize") || "12"), 50)
    const tag = searchParams.get("tag") || undefined

    const productsData = await getProducts({
      categorySlug: params.slug,
      tag,
      page,
      pageSize,
    })

    return NextResponse.json({
      category,
      ...productsData,
    })
  } catch (error) {
    console.error("GET /api/categories/[slug] error:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}
