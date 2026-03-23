"use client"

import { useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"

const TELEGRAM_SUPPORT = "https://t.me/bububu"

const PAYMENT_METHODS = [
    {
        currency: "USDT (TRC20)",
        code: "USDT_TRC20",
        address: "TYourTRC20AddressHere",
        network: "Tron (TRC20)",
        icon: "💵",
        color: "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400",
    },
    {
        currency: "USDT (BEP20)",
        code: "USDT_BEP20",
        address: "0xYourBEP20AddressHere",
        network: "BNB Smart Chain (BEP20)",
        icon: "💵",
        color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400",
    },
    {
        currency: "Binance ID",
        code: "BINANCE_ID",
        address: "123456789",
        network: "Binance Pay",
        icon: "🔶",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
    },
]

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)
    const copy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    return (
        <button
            onClick={copy}
            className="ml-2 p-1.5 rounded-md hover:bg-accent transition-colors shrink-0"
            title="Copy"
        >
            {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
            ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
            )}
        </button>
    )
}

export function TopUpContent() {
    const [selected, setSelected] = useState(PAYMENT_METHODS[0])
    const { t } = useI18n()

    return (
        <div className="container mx-auto px-4 py-6 md:py-10 max-w-2xl">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("topup.title")}</h1>
                <p className="text-muted-foreground text-sm md:text-base">
                    {t("topup.subtitle")}
                </p>
            </div>

            {/* Step 1 — Select payment method */}
            <div className="mb-5 md:mb-6">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    {t("topup.step1")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                    {PAYMENT_METHODS.map((w) => (
                        <button
                            key={w.code}
                            onClick={() => setSelected(w)}
                            className={`flex items-center gap-2.5 px-3 py-3 rounded-lg border text-sm font-medium transition-all ${
                                selected.code === w.code
                                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                                    : "border-border bg-card hover:border-primary/40 text-foreground"
                            }`}
                        >
                            <span className="text-lg">{w.icon}</span>
                            <div className="text-left">
                                <div className="font-semibold text-xs">{w.currency}</div>
                                <div className="text-xs text-muted-foreground">{w.network}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Step 2 — Payment details */}
            <div className="mb-5 md:mb-6">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    {t("topup.step2")}
                </p>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-3 ${selected.color}`}
                        >
                            <span>{selected.icon}</span>
                            {selected.currency} · {selected.network}
                        </div>
                        <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2.5">
                            <code className="text-xs md:text-sm font-mono break-all flex-1 select-all">
                                {selected.address}
                            </code>
                            <CopyButton text={selected.address} />
                        </div>
                        {selected.code !== "BINANCE_ID" && (
                            <p className="text-xs text-muted-foreground mt-2">
                                ⚠️ {t("topup.networkWarning").replace("{currency}", selected.currency)}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Step 3 — Contact support */}
            <div className="mb-6 md:mb-8">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    {t("topup.step3")}
                </p>
                <Card>
                    <CardContent className="pt-5 pb-5 text-center">
                        <div className="mb-4">
                            <svg className="h-10 w-10 mx-auto mb-3" viewBox="0 0 24 24" fill="#229ED9">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.238l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.963.321z" />
                            </svg>
                            <h3 className="font-semibold text-base md:text-lg mb-1">
                                {t("topup.contactTitle")}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t("topup.contactDesc")}
                            </p>
                        </div>
                        <Button
                            size="lg"
                            className="bg-[#229ED9] hover:bg-[#1a8bbf] text-white border-0 w-full sm:w-auto"
                            asChild
                        >
                            <a href={TELEGRAM_SUPPORT} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {t("topup.openTelegram")}
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}