import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="grid min-h-[70vh] place-items-center bg-dark px-5 py-20 text-center text-ivory sm:px-6">
        <div className="max-w-xl">
          <p className="font-display text-7xl text-crimson sm:text-8xl">404</p>
          <h1 className="mt-4 font-display text-3xl uppercase leading-tight sm:text-4xl">
            Esta página no existe
          </h1>
          <p className="mt-4 text-base leading-7 text-ivory-dim">
            Puede que el enlace esté mal escrito o que la página se haya movido.
            Vuelve al inicio o cuéntanos qué necesitas en una consulta inicial.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/agenda" data-track="agenda">
              <Button as="span" size="lg" className="w-full sm:w-auto">Agenda una consulta inicial</Button>
            </Link>
            <Link href="/">
              <Button as="span" variant="outline" size="lg" className="w-full sm:w-auto">Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
