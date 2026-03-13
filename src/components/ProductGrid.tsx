"use client"

import { ProductCard } from "@/components/ProductCard"
import { useI18n } from "@/lib/i18n"
import type { ProductWithCategory } from "@/types"

interface ProductGridProps {
  products: ProductWithCategory[]
  emptyMessage?: string
}

export function ProductGrid({ products, emptyMessage }: ProductGridProps) {
  const { t } = useI18n()
  const empty = emptyMessage ?? t("products.notFound")

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>{empty}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
