"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const TAX_RATE = 21

function slugify(name?: string) {
  if (!name || typeof name !== "string") return "game"
  return name
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
}

export function SteamDeals() {

  const router = useRouter()

  const [featured, setFeatured] = useState<any[]>([])
  const [deals, setDeals] = useState<any[]>([])
  const [limit, setLimit] = useState(20)

  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const [exchangeRate, setExchangeRate] = useState<number>(1200)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  // 💵 dólar
  useEffect(() => {
    fetchDollar()
  }, [])

  async function fetchDollar() {
    try {
      const res = await fetch("https://dolarapi.com/v1/dolares/blue")
      const data = await res.json()
      setExchangeRate(data.venta)
    } catch {
      setExchangeRate(1200)
    }
  }

  // 🔄 carga inicial + más
  useEffect(() => {
    loadDeals(limit === 20)
  }, [limit])

  async function loadDeals(isFirstLoad = false) {

    if (isFirstLoad) setLoading(true)
    else setLoadingMore(true)

    try {

      const res = await fetch(`/api/steam-deals?limit=${limit}`)
      const data = await res.json()

      const validFeatured = (data.featured || []).filter((g: any) => g?.name)
      const validDeals = (data.deals || []).filter((g: any) => g?.name)

      setFeatured(validFeatured)
      setDeals(validDeals)

      if (!validDeals.length || validDeals.length < limit) {
        setHasMore(false)
      }

    } catch {
      setDeals([])
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // 🔁 volver atrás FIX
  useEffect(() => {
    const handleFocus = () => {
      router.refresh()
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [router])

  // 🔽 scroll infinito
  useEffect(() => {

    if (!loaderRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          setLimit((prev) => prev + 20)
        }
      },
      { threshold: 1 }
    )

    observer.observe(loaderRef.current)

    return () => observer.disconnect()

  }, [loadingMore, hasMore])

  // 💰 cálculo
  function calculateFinalARS(priceUSD: number) {
    if (!priceUSD) return 0
    const finalUSD = priceUSD * (1 + TAX_RATE / 100)
    return finalUSD * exchangeRate
  }

  // ⚡ preload al hover
  function handlePreload(href: string) {
    router.prefetch(href)
  }

  // 🧊 skeleton UI
  function SkeletonCard() {
    return (
      <div className="animate-pulse border rounded-xl p-3 space-y-2">
        <div className="bg-muted h-32 rounded"></div>
        <div className="bg-muted h-4 w-3/4 rounded"></div>
        <div className="bg-muted h-4 w-1/2 rounded"></div>
      </div>
    )
  }

  return (

    <div className="space-y-12">

      {/* ⭐ DESTACADOS */}
      <section className="space-y-6">

        <h2 className="text-2xl font-bold">
          ⭐ Juegos más vendidos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((game) => {

              const finalARS = calculateFinalARS(game.final)
              const href = `/juego/${slugify(game.name)}-${game.id}`

              return (

                <Link
                  key={game.id}
                  href={href}
                  onMouseEnter={() => handlePreload(href)}
                  className="group border rounded-2xl overflow-hidden hover:scale-[1.03] transition duration-200 bg-card"
                >

                  <div className="relative">

                    <Image
                      src={game.image}
                      alt={game.name}
                      width={400}
                      height={200}
                      className="w-full h-44 object-cover"
                    />

                    {game.discount > 0 && (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        -{game.discount}%
                      </span>
                    )}

                  </div>

                  <div className="p-4 space-y-2">

                    <p className="font-semibold line-clamp-2">
                      {game.name}
                    </p>

                    <p className="text-primary font-bold text-lg">
                      ${Math.round(finalARS).toLocaleString("es-AR")}
                    </p>

                  </div>

                </Link>

              )
            })
          }

        </div>

      </section>

      {/* 🔥 TODAS */}
      <section className="space-y-6">

        <h2 className="text-2xl font-bold">
          🔥 Todas las ofertas
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {loading
            ? Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : deals.map((game) => {

              const finalARS = calculateFinalARS(game.final)
              const href = `/juego/${slugify(game.name)}-${game.id}`

              return (

                <Link
                  key={game.id}
                  href={href}
                  onMouseEnter={() => handlePreload(href)}
                  className="group border rounded-xl overflow-hidden hover:scale-[1.03] transition duration-200 bg-card"
                >

                  <Image
                    src={game.image}
                    alt={game.name}
                    width={300}
                    height={150}
                    className="w-full h-32 object-cover"
                  />

                  <div className="p-3 space-y-1">

                    <p className="text-sm font-medium line-clamp-2">
                      {game.name}
                    </p>

                    <p className="text-green-500 text-xs">
                      -{game.discount}% OFF
                    </p>

                    <p className="text-primary font-semibold text-sm">
                      ${Math.round(finalARS).toLocaleString("es-AR")}
                    </p>

                  </div>

                </Link>

              )
            })
          }

        </div>

        {/* SCROLL */}
        <div ref={loaderRef} className="h-16 flex justify-center items-center">

          {loadingMore && (
            <span className="text-sm text-muted-foreground">
              Cargando más ofertas...
            </span>
          )}

          {!hasMore && (
            <span className="text-sm text-muted-foreground">
              No hay más juegos
            </span>
          )}

        </div>

      </section>

    </div>
  )
}