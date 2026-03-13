"use client"

import Link from "next/link"
import { Package, ShoppingCart, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

interface Product {
  title: string
  availability: boolean
  tags: string[]
  minOrder: number
  description: string
  category: {
    name: string
    slug: string
  }
}

interface ProductDetailClientProps {
  product: Product
  price: number
}

export function ProductDetailClient({ product, price }: ProductDetailClientProps) {
  const { t } = useI18n()

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Link href={`/categories/${product.category.slug}`}>
          <Badge variant="secondary">
            <Tag className="h-3 w-3 mr-1" />
            {product.category.name}
          </Badge>
        </Link>
        <Badge variant={product.availability ? "success" : "warning"}>
          {product.availability ? t("products.inStock") : t("products.outOfStock")}
        </Badge>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{product.title}</h1>

      <div className="flex items-baseline gap-2 mb-5 md:mb-6">
        <span className="text-3xl md:text-4xl font-bold text-primary">{formatPrice(price)}</span>
        <span className="text-muted-foreground">{t("products.perUnit")}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3 mb-5 md:mb-6">
        <Package className="h-4 w-4 shrink-0" />
        <span>
          {t("products.minOrderLabel")}{" "}
          <strong className="text-foreground">
            {product.minOrder}{" "}
            {product.minOrder > 1 ? t("products.units") : t("products.unit")}
          </strong>
        </span>
      </div>

      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-7 md:mb-8">
          {product.tags.map((tag) => (
            <Link key={tag} href={`/products?tag=${tag}`}>
              <Badge
                variant="outline"
                className="hover:bg-accent cursor-pointer text-xs"
              >
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <Button size="lg" className="w-full" asChild>
          <Link href="/contact">
            <ShoppingCart className="mr-2 h-4 w-4" />
            {t("products.contactToPurchase")}
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="w-full" asChild>
          <Link href="/contact">{t("products.getSupport")}</Link>
        </Button>
      </div>
    </div>
  )
}
