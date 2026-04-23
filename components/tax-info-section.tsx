import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Receipt, Percent, Building2 } from "lucide-react"

export function TaxInfoSection() {

  const taxes = [
    {
      icon: Percent,
      name: "Impuesto PAIS",
      rate: "30%",
      description:
        "Impuesto aplicado a compras realizadas en moneda extranjera, incluyendo servicios digitales como Steam.",
    },
    {
      icon: Receipt,
      name: "Percepción de Ganancias",
      rate: "30%",
      description:
        "Pago adelantado del impuesto a las ganancias aplicado a compras en moneda extranjera.",
    },
    {
      icon: Building2,
      name: "IVA Digital",
      rate: "21%",
      description:
        "Impuesto al Valor Agregado aplicado a servicios digitales prestados por empresas del exterior.",
    },
  ]

  return (
    <section className="space-y-6">

      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Info className="h-5 w-5 text-primary" />
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          Impuestos de Steam en Argentina
        </h2>
      </div>

      <Card className="bg-card border-border">

        <CardHeader>
          <CardTitle className="text-foreground text-lg">
            ¿Por qué los juegos de Steam son más caros en Argentina?
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <p className="text-muted-foreground leading-relaxed">
            Cuando compras juegos en Steam desde Argentina, se aplican varios
            impuestos sobre el precio original del juego. Estos impuestos se
            aplican a la mayoría de los servicios digitales comprados en moneda
            extranjera.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Debido a estos impuestos, el precio final de un juego puede ser{" "}
            <span className="text-primary font-semibold">
              60% o más alto
            </span>{" "}
            que el precio listado en Steam.
          </p>

          {/* Grid de impuestos */}

          <div className="grid gap-4 md:grid-cols-3">

            {taxes.map((tax) => (
              <div
                key={tax.name}
                className="p-4 bg-secondary/50 rounded-lg space-y-2"
              >

                <div className="flex items-center gap-2">
                  <tax.icon className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    {tax.name}
                  </h3>
                </div>

                <p className="text-2xl font-mono text-accent">
                  {tax.rate}
                </p>

                <p className="text-sm text-muted-foreground">
                  {tax.description}
                </p>

              </div>
            ))}

          </div>

          {/* Caja informativa */}

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">

            <p className="text-sm text-foreground">
              <strong>Importante:</strong> Las tasas de impuestos en Argentina
              pueden cambiar según las regulaciones del gobierno. Esta
              calculadora utiliza una tasa combinada por defecto de{" "}
              <span className="font-semibold">60%</span>, pero puedes ajustar el
              control de impuestos en la calculadora para reflejar las reglas
              actuales.
            </p>

          </div>

        </CardContent>

      </Card>

    </section>
  )
}