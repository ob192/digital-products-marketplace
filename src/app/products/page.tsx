import { Suspense } from "react"
import type { Metadata } from "next"
import { ProductGrid } from "@/components/ProductGrid"
import { Pagination } from "@/components/Pagination"
import { ProductFiltersBar } from "@/components/ProductFiltersBar"
import { ProductsPageHeader } from "@/components/ProductsPageHeader"
import { getProducts } from "@/lib/products"
import { getCategories } from "@/lib/categories"

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our full catalog of premium digital goods including streaming accounts, game keys, software licenses, and more.",
}

interface ProductsPageProps {
  searchParams: { search?: string; category?: string; tag?: string; page?: string }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = parseInt(searchParams.page || "1", 10)
  const [{ products, total, totalPages }, categories] = await Promise.all([
    getProducts({
      search: searchParams.search,
      categoryId: searchParams.category,
      tag: searchParams.tag,
      page,
      pageSize: 12,
    }),
    getCategories(),
  ])

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <ProductsPageHeader total={total} />

      <Suspense>
        <ProductFiltersBar categories={categories} />
      </Suspense>

      <div className="mt-6 md:mt-8">
        <ProductGrid products={products as never} />
        <Suspense>
          <Pagination currentPage={page} totalPages={totalPages} />
        </Suspense>
      </div>
    </div>
  )
}
