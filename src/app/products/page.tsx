import { Suspense } from "react"
import type { Metadata } from "next"
import { ProductGrid } from "@/components/ProductGrid"
import { Pagination } from "@/components/Pagination"
import { ProductFiltersBar } from "@/components/ProductFiltersBar"
import { ProductsPageHeader } from "@/components/ProductsPageHeader"
import { getProducts } from "@/lib/products"
import { getCategories } from "@/lib/categories"

export const metadata: Metadata = {
  title: "All Products — DigitalHub",
  description:
      "Browse our full catalog of premium digital goods including Facebook accounts, BM, farm, autoreg, and more.",
  openGraph: {
    title: "All Products — DigitalHub",
    description:
        "Browse our full catalog of premium digital goods.",
  },
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ""

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Products — DigitalHub",
    description: "Browse our full catalog of premium digital goods.",
    url: `${baseUrl}/products`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl || "/" },
        { "@type": "ListItem", position: 2, name: "Products" },
      ],
    },
  }

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="container mx-auto px-4 py-6 md:py-10">
          <ProductsPageHeader total={total} />

          <Suspense>
            <ProductFiltersBar categories={categories} />
          </Suspense>

          <div className="mt-5 md:mt-8">
            <ProductGrid products={products as never} />
            <Suspense>
              <Pagination currentPage={page} totalPages={totalPages} />
            </Suspense>
          </div>
        </div>
      </>
  )
}