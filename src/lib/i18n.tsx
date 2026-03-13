"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { ReactNode } from "react"
import en from "@/locales/en.json"
import ru from "@/locales/ru.json"

export type Locale = "en" | "ru"

type NestedKeyOf<T, K extends string = ""> = T extends object
  ? {
      [P in keyof T]: P extends string
        ? K extends ""
          ? NestedKeyOf<T[P], P>
          : NestedKeyOf<T[P], `${K}.${P}`>
        : never
    }[keyof T]
  : K

export type TranslationKey = NestedKeyOf<typeof en>

const locales: Record<Locale, typeof en> = { en, ru }

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
]

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".")
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === "string" ? current : path
}

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
})

const STORAGE_KEY = "dh-locale"

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (saved && locales[saved]) {
      setLocaleState(saved)
    } else {
      const browserLang = navigator.language.split("-")[0] as Locale
      if (locales[browserLang]) setLocaleState(browserLang)
    }
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }, [])

  const t = useCallback(
    (key: string) => getNestedValue(locales[locale] as unknown as Record<string, unknown>, key),
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
