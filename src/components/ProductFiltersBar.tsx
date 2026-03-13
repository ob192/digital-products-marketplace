"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import type { Category } from "@/types"

interface ProductFiltersBarProps {
  categories: Category[]
}

export function ProductFiltersBar({ categories }: ProductFiltersBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { t } = useI18n()

  const currentSearch = searchParams.get("search") || ""
  const currentCategory = searchParams.get("category") || ""

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const clearFilters = () => {
    router.push(pathname)
  }

  const hasFilters = currentSearch || currentCategory

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("filters.searchPlaceholder")}
          defaultValue={currentSearch}
          className="pl-10"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateParam("search", (e.target as HTMLInputElement).value)
            }
          }}
          onChange={(e) => {
            if (!e.target.value) updateParam("search", "")
          }}
        />
      </div>

      <Select
        value={currentCategory || "all"}
        onValueChange={(val) => updateParam("category", val === "all" ? "" : val)}
      >
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder={t("filters.allCategories")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("filters.allCategories")}</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="outline"
          size="icon"
          onClick={clearFilters}
          title={t("filters.clearFilters")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
