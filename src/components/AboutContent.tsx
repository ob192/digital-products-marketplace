"use client"

import Link from "next/link"
import { Shield, Zap, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function AboutContent() {
  const { t } = useI18n()

  const values = [
    { icon: Shield, titleKey: "about.trust", descKey: "about.trustDesc" },
    { icon: Zap, titleKey: "about.instant", descKey: "about.instantDesc" },
    { icon: Users, titleKey: "about.customer", descKey: "about.customerDesc" },
    { icon: CheckCircle, titleKey: "about.quality", descKey: "about.qualityDesc" },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-5 md:mb-6">{t("about.title")}</h1>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{t("about.mission")}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{t("about.missionP1")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("about.missionP2")}</p>
        </div>

        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">{t("about.values")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {values.map((v) => (
              <div
                key={v.titleKey}
                className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card"
              >
                <div className="p-2 rounded-md bg-primary/10 shrink-0">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t(v.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(v.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/20">
          <h2 className="text-xl md:text-2xl font-bold mb-3">{t("about.readyTitle")}</h2>
          <p className="text-muted-foreground mb-5 md:mb-6">{t("about.readySubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/products">{t("about.browseProducts")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/contact">{t("about.contactSupport")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
