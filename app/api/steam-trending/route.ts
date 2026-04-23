import { NextResponse } from "next/server"

export async function GET() {

const res = await fetch(
"https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/"
)

const data = await res.json()

const top = data.response.ranks.slice(0,10)

const games = top.map((g:any)=>({
id:g.appid,
image:`https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/capsule_sm_120.jpg`
}))

return NextResponse.json({games})

}