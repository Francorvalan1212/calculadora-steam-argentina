export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl space-y-6">

      <h1 className="text-3xl font-bold">
        Contacto
      </h1>

      <p className="text-muted-foreground">
        Si tenés consultas, sugerencias o problemas con la web, podés contactarnos:
      </p>

      <div className="space-y-2">

        <p>
          📧 Email: fcdeveloper12@gmail.com
        </p>

        <p>
          💬 También podés enviar sugerencias sobre nuevos juegos o mejoras.
        </p>

      </div>

      <p className="text-sm text-muted-foreground">
        Respondemos dentro de 24-48 horas.
      </p>

    </main>
  )
}