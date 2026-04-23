import { NextResponse } from "next/server"

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "50")

    const res = await fetch(
      "https://store.steampowered.com/api/featuredcategories?cc=ar&l=ar",
      { cache: "no-store" }
    )

    const data = await res.json()

    function mapGames(list: any[]) {
      return list.map((game: any) => ({
        id: game.id,
        name: game.name,
        image: game.large_capsule_image || game.small_capsule_image,
        discount: game.discount_percent,
        original: game.original_price / 100,
        final: game.final_price / 100
      }))
    }

    const specials = mapGames(data.specials.items || [])
    const top = mapGames(data.top_sellers.items || [])
    const newReleases = mapGames(data.new_releases.items || [])

    let allGames = [...specials, ...top, ...newReleases]

    const unique = allGames.filter(
      (game, index, self) =>
        index === self.findIndex((g) => g.id === game.id)
    )

    const deals = unique
      .filter((g) => g.discount > 0)
      .sort((a, b) => b.discount - a.discount)

    return NextResponse.json({
      featured: top.slice(0, 6),
      deals: deals.slice(0, limit)
    })

  } catch {

    return NextResponse.json({
      featured: [],
      deals: []
    })

  }
}