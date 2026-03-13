"use client"

import { useI18n, LOCALES } from "@/lib/i18n"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n()

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((l) => (
        <Button
          key={l.code}
          variant="ghost"
          size="sm"
          onClick={() => setLocale(l.code)}
          className={`h-8 px-2 text-xs font-medium transition-colors ${
            locale === l.code
              ? "bg-primary/20 text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title={l.label}
        >
          <span className="mr-1">{l.flag}</span>
          {!compact && <span>{l.code.toUpperCase()}</span>}
          {compact && <span>{l.code.toUpperCase()}</span>}
        </Button>
      ))}
    </div>
  )
}
