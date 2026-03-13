"use client"

import Link from "next/link"
import { Send, MessageCircle, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"

const TELEGRAM_URL =
  process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT || "https://t.me/support_account"

export function ContactContent() {
  const { t } = useI18n()

  const features = [
    { icon: Clock, titleKey: "contact.available", descKey: "contact.availableDesc" },
    { icon: MessageCircle, titleKey: "contact.fastResponse", descKey: "contact.fastResponseDesc" },
    { icon: Shield, titleKey: "contact.private", descKey: "contact.privateDesc" },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 mb-5 md:mb-6">
          <Send className="h-6 w-6 md:h-7 md:w-7 text-primary" />
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{t("contact.title")}</h1>
        <p className="text-muted-foreground text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
          {t("contact.subtitle")}
        </p>

        <div className="bg-gradient-to-br from-[#229ED9]/10 to-[#229ED9]/5 border border-[#229ED9]/20 rounded-2xl p-6 md:p-8 mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="#229ED9">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.238l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.963.321z" />
            </svg>
            <h2 className="text-lg md:text-xl font-bold">{t("contact.telegramTitle")}</h2>
          </div>
          <p className="text-muted-foreground mb-5 md:mb-6 text-sm md:text-base">
            {t("contact.telegramDesc")}
          </p>
          <Button
            size="lg"
            className="bg-[#229ED9] hover:bg-[#1a8bbf] text-white border-0 w-full sm:w-auto"
            asChild
          >
            <Link href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.238l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.963.321z" />
              </svg>
              {t("contact.openTelegram")}
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {features.map((f) => (
            <Card key={f.titleKey} className="text-center">
              <CardContent className="pt-5 md:pt-6 px-4">
                <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 mb-3">
                  <f.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{t(f.titleKey)}</h3>
                <p className="text-xs text-muted-foreground">{t(f.descKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
