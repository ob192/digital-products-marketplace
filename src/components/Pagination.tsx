"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { t } = useI18n()

  if (totalPages <= 1) return null

  const navigateTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    router.push(`${pathname}?${params.toString()}`)
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
  )

  return (
    <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-8 md:mt-10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={t("pagination.previous")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, idx) => {
        const prevPage = pages[idx - 1]
        const showEllipsis = prevPage && page - prevPage > 1
        return (
          <span key={page} className="flex items-center gap-1.5 md:gap-2">
            {showEllipsis && (
              <span className="text-muted-foreground text-sm">…</span>
            )}
            <Button
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => navigateTo(page)}
              className="w-8 md:w-9"
            >
              {page}
            </Button>
          </span>
        )
      })}

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={t("pagination.next")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
