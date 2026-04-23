import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "¿Por qué los juegos de Steam son más caros en Argentina?",
    answer:
      "Los juegos de Steam son más caros en Argentina porque las compras en moneda extranjera incluyen varios impuestos. Generalmente incluyen el Impuesto PAIS (30%) y una percepción a cuenta del impuesto a las ganancias (30%). Por eso, el precio final de los juegos puede ser alrededor de un 60% más alto que el precio original.",
  },
  {
    question: "¿Cuánto impuesto tienen los juegos de Steam en Argentina?",
    answer:
      "La mayoría de las compras en Steam desde Argentina incluyen aproximadamente un 60% en impuestos. Esto normalmente proviene del Impuesto PAIS (30%) y la percepción de ganancias (30%). Algunas transacciones también pueden incluir otros impuestos dependiendo del método de pago o cambios en las regulaciones.",
  },
  {
    question: "¿Cómo puedo calcular el precio final de un juego de Steam en Argentina?",
    answer:
      "Puedes usar una calculadora de impuestos de Steam como esta. Solo tienes que ingresar el precio del juego en USD y la calculadora estimará el precio final incluyendo los impuestos argentinos y lo convertirá a pesos argentinos utilizando el tipo de cambio actual.",
  },
  {
    question: "¿Qué es el dólar blue?",
    answer:
      "El dólar blue es el tipo de cambio informal del dólar en Argentina. Muchas personas lo utilizan como referencia del valor real del dólar en el mercado. Esta calculadora usa este valor para estimar el precio final en pesos argentinos.",
  },
  {
    question: "¿Se pueden evitar los impuestos de Steam en Argentina?",
    answer:
      "No. Los impuestos sobre compras en moneda extranjera se aplican automáticamente por los bancos y procesadores de pago argentinos. Estos impuestos son obligatorios según las regulaciones del gobierno y no pueden evitarse usando métodos de pago locales.",
  },
  {
    question: "¿Qué tan precisa es esta calculadora de precios de Steam?",
    answer:
      "Esta calculadora proporciona una estimación basada en las tasas de impuestos más comunes y el tipo de cambio actual. El monto final que cobre tu banco puede variar ligeramente dependiendo del tipo de cambio aplicado, el método de pago y posibles cambios en las políticas impositivas.",
  },
]

export function FAQSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <HelpCircle className="h-5 w-5 text-primary" />
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          Impuestos de Steam en Argentina – Preguntas frecuentes
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">

        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-border"
          >

            <AccordionTrigger className="text-foreground hover:text-primary text-left">
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>

          </AccordionItem>
        ))}

      </Accordion>
    </section>
  )
}