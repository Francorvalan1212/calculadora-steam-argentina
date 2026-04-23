import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const term = searchParams.get("q")

  if (!term) {
    return NextResponse.json({ results: [] })
  }

  const res = await fetch(
    `https://store.steampowered.com/api/storesearch/?term=${term}&l=english&cc=ar`
  )

  const data = await res.json()

  const results =
    data.items?.map((game: any) => ({
      id: game.id,
      name: game.name,
      image: game.tiny_image,
      price: game.price?.final ? game.price.final / 100 : null,
    })) || []

  return NextResponse.json({ results })
}