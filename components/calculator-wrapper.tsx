"use client"

import { Suspense } from "react"
import { Calculator } from "@/components/calculator"

export default function CalculatorWrapper() {
  return (
    <Suspense fallback={<div className="p-6">Cargando calculadora...</div>}>
      <Calculator />
    </Suspense>
  )
}