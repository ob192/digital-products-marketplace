"use client"

import Link from "next/link"
import { ShoppingBag, Send } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const TELEGRAM_URL = "https://t.me/TTFarmFBfarm"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useI18n()

  return (
      <footer className="border-t border-border/50 bg-background/50 mt-auto">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-2 md:mb-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span>DigitalHub</span>
              </Link>
              <p className="text-xs md:text-sm text-muted-foreground max-w-xs leading-relaxed">
                {t("footer.desc")}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2 md:mb-4">{t("footer.navigation")}</h4>
              <ul className="space-y-1.5 md:space-y-2">
                {[
                  { href: "/", key: "nav.home" },
                  { href: "/products", key: "nav.products" },
                  { href: "/topup", key: "nav.topUp" },
                  { href: "/about", key: "nav.about" },
                ].map((link) => (
                    <li key={link.href}>
                      <Link
                          href={link.href}
                          className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {t(link.key)}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2 md:mb-4">{t("footer.support")}</h4>
              <ul className="space-y-1.5 md:space-y-2">
                <li>
                  <a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                  >
                    <Send className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    {t("footer.telegramSupport")}
                  </a>
                </li>
                <li>
                  <Link
                      href="/about"
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("footer.aboutUs")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-3">
            <p className="text-xs text-muted-foreground">
              © {currentYear} DigitalHub. {t("footer.rights")}
            </p>
            <p className="text-xs text-muted-foreground">{t("footer.tagline")}</p>
          </div>
        </div>
      </footer>
  )
}