import { SteamDeals } from "@/components/steam-deals"
import { Gamepad2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Ofertas de Steam Argentina 2026",
  description:
    "Encuentra las mejores ofertas de Steam en Argentina y calcula el precio final con impuestos incluidos en pesos argentinos.",
}

export default function SteamSalesPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* HEADER */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Gamepad2 className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h1 className="text-lg font-bold">
                  Steam Tax Calculator
                </h1>

                <p className="text-xs text-muted-foreground">
                  Argentina 2026
                </p>
              </div>
            </div>

            {/* VOLVER */}
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Volver al calculador
            </Link>

          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="container mx-auto px-4 py-10 md:py-14">

        <div className="text-center max-w-3xl mx-auto space-y-5">

          <h2 className="text-3xl md:text-5xl font-bold">
            🔥 Ofertas de Steam en Argentina
          </h2>

          <p className="text-lg text-muted-foreground">
            Descubre juegos en oferta y mira el precio final en pesos argentinos con impuestos incluidos.
          </p>

          {/* 💡 NUEVO: INFO CLAVE */}
          <div className="inline-block bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg text-sm text-primary">
            💰 Precios finales en ARS con impuestos incluidos
          </div>

        </div>

      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="container mx-auto px-4 pb-16">

        {/* 💡 CONTENEDOR MÁS ANCHO */}
        <div className="max-w-7xl mx-auto">

          <SteamDeals />

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8 text-center space-y-2">

          <p className="text-muted-foreground text-sm">
            Ofertas de Steam Argentina 2026 — Juegos con descuento y precios finales en pesos argentinos
          </p>

          <p className="text-muted-foreground text-xs">
            Este sitio no está afiliado con Steam o Valve.
          </p>

        </div>
      </footer>

    </main>
  )
}