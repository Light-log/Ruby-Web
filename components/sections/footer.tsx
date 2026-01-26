export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-gunmetal-950/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} Consultora Ruby. Todos los derechos reservados.
        </div>
        <div className="text-sm text-white/60">
          Hecho con Next.js + Tailwind + anime.js
        </div>
      </div>
    </footer>
  );
}
