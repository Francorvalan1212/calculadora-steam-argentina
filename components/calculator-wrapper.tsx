"use client"

import { useEffect } from "react"

export function CalculatorWrapper({ slug }: { slug?: string }) {

  useEffect(() => {

    if (!slug || typeof slug !== "string") return

    // 🔥 limpiamos el slug
    const clean = slug.replace("-precio-argentina", "")

    // 🚀 redirección REAL (evita el bug del calculator)
    window.location.href = `/?game=${clean}`

  }, [slug])

  // ⛔ no renderiza nada porque redirige
  return null
}