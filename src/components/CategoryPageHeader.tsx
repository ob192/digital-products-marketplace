"use client"

import { useI18n } from "@/lib/i18n"

interface CategoryPageHeaderProps {
  category: {
    name: string
    description?: string | null
  }
  total: number
}

export function CategoryPageHeader({ category, total }: CategoryPageHeaderProps) {
  const { t } = useI18n()
  return (
    <div className="mb-8 md:mb-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h1>
      {category.description && (
        <p className="text-muted-foreground max-w-2xl">{category.description}</p>
      )}
      <p className="text-sm text-muted-foreground mt-2">
        {total} {t("categories.products")}
      </p>
    </div>
  )
}
