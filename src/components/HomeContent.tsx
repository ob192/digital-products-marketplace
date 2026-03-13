"use client"

import Link from "next/link"
import { ArrowRight, Zap, Shield, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/ProductGrid"
import { CategoryCard } from "@/components/CategoryCard"
import { useI18n } from "@/lib/i18n"

// Client wrapper for home page content
export function HomeContent({
  categories,
}: {
  categories: Parameters<typeof CategoryCard>[0]["category"][]
}) {
  const { t } = useI18n()

  const features = [
    { icon: Zap, titleKey: "features.instantDelivery", descKey: "features.instantDeliveryDesc" },
    { icon: Shield, titleKey: "features.secure", descKey: "features.secureDesc" },
    { icon: Headphones, titleKey: "features.support", descKey: "features.supportDesc" },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-b border-border/50">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 mb-5 md:mb-6">
              <Zap className="h-3 w-3" />
              {t("hero.badge")}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 md:mb-6 leading-tight">
              {t("hero.title")}{" "}
              <span className="text-primary">{t("hero.titleAccent")}</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-7 md:mb-8 leading-relaxed max-w-2xl">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/products">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/contact">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-30 hidden lg:block">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-primary/10 blur-2xl" />
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
            {features.map((feature) => (
              <div key={feature.titleKey} className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base">{t(feature.titleKey)}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{t(feature.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-1">{t("categories.title")}</h2>
            <p className="text-muted-foreground text-sm">{t("categories.subtitle")}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/products">{t("categories.viewAll")}</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-primary/5">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground mb-6 md:mb-8 max-w-lg mx-auto text-sm md:text-base">
            {t("cta.subtitle")}
          </p>
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/contact">
              {t("cta.button")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
