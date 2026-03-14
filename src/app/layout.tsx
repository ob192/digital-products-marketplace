import type { Metadata } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { I18nProvider } from "@/lib/i18n"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: {
    default: "DigitalHub — Premium Digital Goods Marketplace",
    template: "%s | DigitalHub",
  },
  description:
    "Your trusted marketplace for premium digital goods. Streaming accounts, game keys, software licenses, and more. Instant delivery, competitive prices.",
  keywords: ["digital goods", "streaming accounts", "game keys", "software licenses", "gift cards"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    siteName: "DigitalHub",
    title: "DigitalHub — Premium Digital Goods Marketplace",
    description: "Your trusted marketplace for premium digital goods.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <I18nProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
