"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useParams } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ResultCard } from "@/components/result-card"

import { Calculator as CalcIcon, Loader2, Copy, Share2 } from "lucide-react"

const DEFAULT_TAX_RATE = 21

const PAYMENT_METHODS = [
  { name: "Tarjeta (Banco)", extra: 0 },
  { name: "MercadoPago", extra: 5 },
  { name: "AstroPay", extra: 2 },
]

//  helper seguro
function safeReplace(value: string | null | undefined, find: string, replace: string) {
  if (!value || typeof value !== "string") return ""
  return value.replaceAll(find, replace)
}

export function Calculator({ initialGame }: { initialGame?: string } = {}) {

  const searchParams = useSearchParams()
  const params = useParams()

  const gameFromUrl = searchParams.get("game")

  //  SOPORTE SEO + ID
  const rawSlug = params?.slug as string
  const extractedId = rawSlug?.match(/\d+/)?.[0] || ""

  const gameParam: string =
    initialGame ??
    extractedId ??
    gameFromUrl ??
    ""

  const [price,setPrice]=useState("")
  const [steamUrl,setSteamUrl]=useState("")

  const [gameName,setGameName]=useState<string|null>(null)
  const [gameImage,setGameImage]=useState<string|null>(null)

  const [taxRate,setTaxRate]=useState(DEFAULT_TAX_RATE)

  const [exchangeRate,setExchangeRate]=useState<number|null>(null)
  const [isLoadingRate,setIsLoadingRate]=useState(true)

  const [search,setSearch]=useState("")
  const [searchResults,setSearchResults]=useState<any[]>([])

  const [error,setError]=useState<string|null>(null)
  const [result,setResult]=useState<any>(null)

  const [copied,setCopied]=useState(false)

  // dólar
  useEffect(()=>{
    fetchExchangeRate()
  },[])

  async function fetchExchangeRate(){

    setIsLoadingRate(true)

    try{
      const res=await fetch("https://dolarapi.com/v1/dolares/blue")
      const data=await res.json()
      setExchangeRate(data.venta)
    }catch{
      setExchangeRate(1200)
    }finally{
      setIsLoadingRate(false)
    }

  }

  //  buscar juegos
  async function searchSteamGames(term:string){

    if(!term){
      setSearchResults([])
      return
    }

    try{
      const res=await fetch(`/api/steam-search?q=${term}`)
      const data=await res.json()
      setSearchResults(data.results)
    }catch{
      setSearchResults([])
    }

  }

  useEffect(()=>{

    const delay=setTimeout(()=>{
      searchSteamGames(search)
    },400)

    return()=>clearTimeout(delay)

  },[search])

  // 🎮 steam
  function extractSteamAppId(url:string){
    const match=url.match(/app\/(\d+)/)
    return match ? match[1] : null
  }

  async function fetchSteamPrice(appId:string){

    try{

      const res=await fetch(`/api/steam-price?appId=${appId}`)
      const data=await res.json()

      if(!res.ok){
        throw new Error(data.error)
      }

      setGameName(data.name)
      setGameImage(data.image)

      return data.price

    }catch{
      throw new Error("Steam price fetch failed")
    }

  }

  async function handleFetchSteamPrice(){

    try{

      const appId=extractSteamAppId(steamUrl)

      if(!appId){
        setError("Invalid Steam URL")
        return
      }

      const gamePrice=await fetchSteamPrice(appId)

      setPrice(gamePrice.toString())

    }catch{
      setError("Could not fetch Steam game price")
    }

  }

  //  CARGA AUTOMÁTICA DEL JUEGO
  useEffect(()=>{

    if(!gameParam) return

    async function loadGame(){

      try{

        // ✔ SI ES ID DIRECTO
        if(/^\d+$/.test(gameParam)){

          setSteamUrl(`https://store.steampowered.com/app/${gameParam}`)

          const gamePrice = await fetchSteamPrice(gameParam)

          setPrice(gamePrice.toString())

          return
        }

        // ✔ SI ES NOMBRE (fallback)
        const gameNameUrl = safeReplace(gameParam, "-", " ")

        setSearch(gameNameUrl)

        const res = await fetch(`/api/steam-search?q=${gameNameUrl}`)
        const data = await res.json()

        if(data.results?.length){

          const game = data.results[0]

          setSteamUrl(`https://store.steampowered.com/app/${game.id}`)

          const gamePrice = await fetchSteamPrice(game.id)

          setPrice(gamePrice.toString())

        }

      }catch{}

    }

    loadGame()

  },[gameParam])

  //  cálculo
  useEffect(()=>{

    if(!price || isNaN(parseFloat(price)) || !exchangeRate){

      setResult(null)
      return

    }

    const basePrice=parseFloat(price)

    const taxAmount=basePrice*(taxRate/100)
    const finalPriceUSD=basePrice+taxAmount
    const finalPriceARS=finalPriceUSD*exchangeRate

    setResult({
      basePrice,
      taxAmount,
      finalPriceUSD,
      finalPriceARS
    })

  },[price,taxRate,exchangeRate])

  //  share
  function createShareLink(){

    if(!gameName) return window.location.href

    const slug = gameName.toLowerCase().replaceAll(" ","-")

    return `${window.location.origin}/?game=${slug}`
  }

  function copyLink(){

    navigator.clipboard.writeText(createShareLink())

    setCopied(true)

    setTimeout(()=>setCopied(false),2000)

  }

  return(

<div className="space-y-6">

<Card>

<CardHeader>
<CardTitle className="flex items-center gap-2">
<CalcIcon className="h-5 w-5 text-primary"/>
Calculadora de Precio de Steam
</CardTitle>
</CardHeader>

<CardContent className="space-y-6">

<p className="text-sm text-muted-foreground">
Precio actualizado con impuestos argentinos y dólar en tiempo real.
</p>
<p className="text-xs text-muted-foreground">
Los precios pueden variar según el tipo de cambio y el método de pago en Argentina.
</p>

{/* SEARCH */}
<div className="space-y-2">

<Label>Buscar juego de Steam</Label>

<Input
placeholder="Buscar juego..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

{searchResults.length>0 &&(

<div className="border rounded-lg max-h-64 overflow-y-auto">

{searchResults.map((game)=>(

<div
key={game.id}
onClick={async()=>{
setSteamUrl(`https://store.steampowered.com/app/${game.id}`)
const gamePrice=await fetchSteamPrice(game.id)
setPrice(gamePrice.toString())
setSearchResults([])
}}
className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer"
>

<img src={game.image} className="w-10 h-10 rounded"/>

<span className="text-sm">
{game.name}
</span>

</div>

))}

</div>

)}

</div>

{/* URL */}
<div className="space-y-2">

<Label>URL de Steam</Label>

<Input
placeholder="https://store.steampowered.com/app/..."
value={steamUrl}
onChange={(e)=>setSteamUrl(e.target.value)}
onBlur={handleFetchSteamPrice}
/>

</div>

{/* GAME */}
{gameName && gameImage &&(

<div className="flex items-center gap-4 p-4 bg-muted rounded-lg">

<img src={gameImage} alt={gameName} className="w-24 rounded"/>

<div>

<p className="font-semibold">{gameName}</p>

<p className="text-sm text-muted-foreground">
Juego detectado de Steam
</p>

</div>

</div>

)}

{/* PRICE */}
<div className="space-y-2">

<Label>Precio en USD</Label>

<Input
type="number"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

</div>

{/* TAX */}
<div className="space-y-3">

<div className="flex justify-between">

<Label>Impuestos</Label>

<span className="font-mono text-primary">
{taxRate}%
</span>

</div>

<Slider
value={[taxRate]}
onValueChange={(value)=>setTaxRate(value[0])}
min={0}
max={100}
step={1}
/>

</div>

{/* EXCHANGE */}
<div className="text-sm text-muted-foreground">

{isLoadingRate
?(
<span className="flex items-center gap-2">
<Loader2 className="h-3 w-3 animate-spin"/>
Cargando dólar...
</span>
)
:(
<span>
1 USD = {exchangeRate?.toLocaleString("es-AR")} ARS
</span>
)
}

</div>

{/* MÉTODOS DE PAGO */}
{result &&(

<div className="space-y-3">

<Label>Métodos de pago (precio final)</Label>

<div className="grid gap-2">

{PAYMENT_METHODS.map((method) => {

const final = result.finalPriceARS * (1 + method.extra / 100)

return (
<div
key={method.name}
className="flex justify-between p-3 bg-muted rounded-lg"
>
<span>{method.name}</span>

<span className="font-mono">
${final.toLocaleString("es-AR")}
</span>
</div>
)

})}

</div>

</div>

)}

{/* SHARE */}
{gameName &&(

<div className="space-y-2">

<div className="flex gap-2">

<Button onClick={copyLink} className="flex items-center gap-2">
<Copy className="h-4 w-4"/>
Copiar link
</Button>

<Button
onClick={()=>navigator.share?.({
title:`Precio de ${gameName} en Argentina`,
url:createShareLink()
})}
className="flex items-center gap-2"
>
<Share2 className="h-4 w-4"/>
Compartir
</Button>

</div>

{copied &&(

<p className="text-green-500 text-sm">
Link copiado ✔
</p>

)}

</div>

)}

</CardContent>
</Card>

{/* RESULT */}
{result &&(

<ResultCard
basePrice={result.basePrice}
taxRate={taxRate}
taxAmount={result.taxAmount}
finalPriceUSD={result.finalPriceUSD}
finalPriceARS={result.finalPriceARS}
exchangeRate={exchangeRate || 1200}
/>

)}

</div>
)
}