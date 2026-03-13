"use client"

import Link from "next/link"
import Image from "next/image"
import { Tag, Package, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { ProductWithCategory } from "@/types"

interface ProductCardProps {
  product: ProductWithCategory
}

export function ProductCard({ product }: ProductCardProps) {
  const price = typeof product.price === "string" ? parseFloat(product.price) : product.price
  const { t } = useI18n()

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/40 group-hover:-translate-y-0.5">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-3 right-3">
            <Badge variant={product.availability ? "success" : "warning"}>
              {product.availability ? t("products.inStock") : t("products.outOfStock")}
            </Badge>
          </div>
        </div>

        <CardContent className="p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {product.category.name}
            </Badge>
          </div>

          <h3 className="font-semibold text-sm md:text-base leading-tight mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3 md:h-3.5 md:w-3.5" />
              <span>
                {t("products.minOrder")} {product.minOrder}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 md:p-4 pt-0 flex items-center justify-between">
          <div>
            <span className="text-base md:text-lg font-bold text-foreground">{formatPrice(price)}</span>
            <span className="text-xs text-muted-foreground ml-1">{t("products.perUnit")}</span>
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
            {t("products.view")} <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
