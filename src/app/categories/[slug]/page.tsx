import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { ProductGrid } from "@/components/ProductGrid"
import { Pagination } from "@/components/Pagination"
import { CategoryPageHeader } from "@/components/CategoryPageHeader"
import { getCategoryBySlug, getAllCategorySlugs } from "@/lib/categories"
import { getProducts } from "@/lib/products"

interface CategoryPageProps {
  params: { slug: string }
  searchParams: { page?: string; tag?: string }
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)
  if (!category) return { title: "Category Not Found" }
  return {
    title: `${category.name} — Digital Goods`,
    description: category.description || `Browse our ${category.name} digital products.`,
  }
}

export const revalidate = 3600

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug)
  if (!category) notFound()

  const page = parseInt(searchParams.page || "1", 10)
  const { products, total, totalPages } = await getProducts({
    categorySlug: params.slug,
    tag: searchParams.tag,
    page,
    pageSize: 12,
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} — Digital Goods`,
    description: category.description,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
        { "@type": "ListItem", position: 3, name: category.name },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 md:mb-8 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        <CategoryPageHeader category={category} total={total} />

        <ProductGrid
          products={products as never}
          emptyMessage={`No products in ${category.name} yet.`}
        />

        <Suspense>
          <Pagination currentPage={page} totalPages={totalPages} />
        </Suspense>
      </div>
    </>
  )
}
