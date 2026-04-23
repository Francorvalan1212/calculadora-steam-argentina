"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Percent, Calculator, Banknote } from "lucide-react"

interface ResultCardProps {
  basePrice: number
  taxRate: number
  taxAmount: number
  finalPriceUSD: number
  finalPriceARS: number
  exchangeRate: number
}

export function ResultCard({
  basePrice,
  taxRate,
  taxAmount,
  finalPriceUSD,
  finalPriceARS,
  exchangeRate,
}: ResultCardProps) {

  const formatARS = (value: number) =>
    value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    })

  const formatUSD = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6 space-y-4">

        <h3 className="text-lg font-semibold text-foreground mb-4">
          Steam Price Breakdown
        </h3>

        <div className="space-y-3">

          {/* Base Price */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>

              <span className="text-muted-foreground">
                Base Price
              </span>
            </div>

            <span className="font-mono text-foreground">
              {formatUSD(basePrice)}
            </span>
          </div>

          {/* Taxes */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <Percent className="h-4 w-4 text-primary" />
              </div>

              <span className="text-muted-foreground">
                Taxes ({taxRate}%)
              </span>
            </div>

            <span className="font-mono text-destructive">
              + {formatUSD(taxAmount)}
            </span>
          </div>

          {/* Final USD */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <Calculator className="h-4 w-4 text-primary" />
              </div>

              <span className="text-muted-foreground">
                Final Price (USD)
              </span>
            </div>

            <span className="font-mono text-lg font-semibold text-foreground">
              {formatUSD(finalPriceUSD)}
            </span>
          </div>

          {/* Final ARS (highlight) */}
          <div className="flex items-center justify-between py-5 bg-primary/10 rounded-lg px-4 -mx-2">

            <div className="flex items-center gap-3">

              <div className="p-2 bg-primary/20 rounded-lg">
                <Banknote className="h-4 w-4 text-primary" />
              </div>

              <div className="flex flex-col">

                <span className="text-foreground font-medium">
                  Final Price in Argentine Pesos
                </span>

                <span className="text-xs text-muted-foreground">
                  Exchange Rate: 1 USD = {exchangeRate.toLocaleString("es-AR")} ARS
                </span>

              </div>

            </div>

            <span className="font-mono text-2xl font-bold text-primary">
              {formatARS(finalPriceARS)}
            </span>

          </div>

        </div>
      </CardContent>
    </Card>
  )
}