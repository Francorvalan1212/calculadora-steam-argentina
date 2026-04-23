import { Calculator } from "@/components/calculator"
import { TaxInfoSection } from "@/components/tax-info-section"
import { FAQSection } from "@/components/faq-section"
import { AdBanner } from "@/components/ad-banner"
import { Gamepad2 } from "lucide-react"
import Link from "next/link"


export default function Home() {
  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">

          <div className="flex items-center gap-3">

            <div className="p-2 bg-primary/10 rounded-lg">
              <Gamepad2 className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-foreground">
                Calculadora Steam Argentina
              </h1>

              <p className="text-sm text-muted-foreground">
                Precio final con impuestos
              </p>
            </div>

          </div>

        </div>
      </header>

      {/* Top Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner position="top" />
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-10 md:py-14">

        <div className="text-center max-w-3xl mx-auto space-y-5">

          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Calculadora de precios de Steam
            <span className="text-primary"> en Argentina</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculá el precio final de los juegos de Steam en Argentina con impuestos incluidos.
            Convertí automáticamente a pesos argentinos usando el dólar actual.
          </p>

          <Link
            href="/steam-sales-argentina"
            className="inline-block text-primary font-bold hover:underline"
          >
             Ver ofertas de Steam
          </Link>

        </div>

      </section>

      {/* CALCULATOR */}
      <section className="container mx-auto px-4 pb-16">

        <div className="flex justify-center">

          <div className="w-full max-w-7xl">
            <Calculator />
          </div>

        </div>

      </section>

      {/* Tax Info */}
      <section className="container mx-auto px-4 py-12 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <TaxInfoSection />
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-12 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <FAQSection />
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-10">
        <AdBanner position="bottom" />
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8 text-center space-y-2">

          <p className="text-muted-foreground text-sm">
            Calculadora de impuestos de Steam Argentina 2026
          </p>

          <p className="text-muted-foreground text-xs">
            Esta herramienta es independiente y no está afiliada a Valve o Steam.
          </p>

        </div>
      </footer>

    </main>
  )
}