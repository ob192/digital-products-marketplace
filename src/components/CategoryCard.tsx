"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"
import type { Category } from "@/types"

interface CategoryCardProps {
  category: Category & { _count?: { products: number } }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { t } = useI18n()

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/30 group-hover:-translate-y-0.5">
        <div className="relative h-32 md:h-36 bg-muted overflow-hidden">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-80"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-bold text-white text-base md:text-lg leading-tight">{category.name}</h3>
          </div>
        </div>
        <div className="p-3 md:p-4 flex items-center justify-between">
          <div>
            {category._count && (
              <p className="text-sm text-muted-foreground">
                {category._count.products} {t("categories.products")}
              </p>
            )}
            {category.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{category.description}</p>
            )}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
        </div>
      </Card>
    </Link>
  )
}
