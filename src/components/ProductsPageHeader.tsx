"use client"

import { useI18n } from "@/lib/i18n"

export function ProductsPageHeader({ total }: { total: number }) {
  const { t } = useI18n()
  return (
    <div className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("products.title")}</h1>
      <p className="text-muted-foreground">
        {total} {t("products.available")}
      </p>
    </div>
  )
}
