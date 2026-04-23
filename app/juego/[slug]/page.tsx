import { Calculator } from "@/components/calculator"

export async function generateMetadata({ params }: any) {

  const rawSlug = params?.slug

  // 🔒 evitar undefined
  const safeSlug =
    typeof rawSlug === "string" ? rawSlug : ""

  const name = safeSlug
    .replace(/-\d+$/, "")
    .replaceAll("-", " ")

  return {
    title: name
      ? `${name} precio en Argentina con impuestos (Steam)`
      : "Precio de Steam en Argentina",

    description: name
      ? `Calcula el precio final de ${name} en Argentina con impuestos y dólar actualizado.`
      : "Calcula precios de Steam en Argentina con impuestos",
  }
}

export default function GamePage() {
  return (
    <main className="container mx-auto py-10">
      <Calculator />
    </main>
  )
}