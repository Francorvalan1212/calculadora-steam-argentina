import { NextResponse } from "next/server"

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url)

    const appId = searchParams.get("appId")

    if (!appId) {

      return NextResponse.json(
        { error: "Missing appId" },
        { status: 400 }
      )

    }

    const res = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=ar&l=ar`
    )

    const data = await res.json()

    const game = data[appId]

    if (!game || !game.success) {

      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      )

    }

    const gameData = game.data

    const name = gameData.name

    const image = gameData.header_image

    if (gameData.is_free || !gameData.price_overview) {

      return NextResponse.json({
        name,
        image,
        price: 0,
        free: true
      })

    }

    const priceOverview = gameData.price_overview

    const finalPrice = priceOverview.final / 100
    const initialPrice = priceOverview.initial / 100

    const discount = priceOverview.discount_percent

    return NextResponse.json({

      name,
      image,
      price: finalPrice,
      originalPrice: initialPrice,
      discount

    })

  } catch {

    return NextResponse.json(
      { error: "Steam API failed" },
      { status: 500 }
    )

  }

}