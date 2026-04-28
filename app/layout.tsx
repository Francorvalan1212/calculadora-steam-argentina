import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://steampricecalculator.com"),

  title: {
    default: "Steam Price Calculator Argentina 2026",
    template: "%s | Steam Argentina",
  },

  description:
    "Calcula el precio real de juegos de Steam en Argentina con impuestos y dólar actualizado.",
  
  icons: {
    icon: "/icon.png",
  },

  keywords: [
    "steam argentina precio",
    "steam impuestos argentina",
    "precio steam argentina 2026",
    "steam calculator argentina",
    "precio juegos steam con impuestos",
  ],

  openGraph: {
    title: "Steam Price Calculator Argentina",
    description:
      "Calcula el precio final de juegos de Steam en Argentina con impuestos.",
    url: "https://steampricecalculator.com",
    siteName: "Steam Calculator Argentina",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}

        {/* SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Steam Price Calculator Argentina",
              url: "https://steampricecalculator.com",
            }),
          }}
        />

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}