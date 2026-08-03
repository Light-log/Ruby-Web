"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryImage = {
  src: string;
  /** Texto alternativo real: el original ponía "Gallery image 1". */
  alt: string;
};

export interface ExpandableGalleryProps {
  images: GalleryImage[];
  className?: string;
}

/**
 * Galería que se expande al pasar el cursor y abre una vista ampliada al hacer
 * clic.
 *
 * En móvil no hay cursor que pueda "expandir", y cinco imágenes en fila darían
 * tiras de 70px: por debajo de `md` se pinta como rejilla de dos columnas y la
 * expansión solo entra a partir de ahí. Se resuelve con clases, sin consultar
 * el ancho desde JS: `flexGrow` no tiene efecto dentro de un grid.
 */
export function ExpandableGallery({ images, className }: ExpandableGalleryProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [selected, setSelected] = React.useState<number | null>(null);
  const lastFocused = React.useRef<HTMLElement | null>(null);

  const isOpen = selected !== null;

  const close = React.useCallback(() => setSelected(null), []);
  const next = React.useCallback(
    () => setSelected((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = React.useCallback(
    () => setSelected((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  /* Teclado y bloqueo del scroll de fondo: la versión original solo se cerraba
     con clic, y la página seguía desplazándose por detrás del modal. */
  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "ArrowLeft") prev();
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
      // Devuelve el foco a la miniatura desde la que se abrió.
      lastFocused.current?.focus();
    };
  }, [isOpen, close, next, prev]);

  const open = (index: number, event: React.MouseEvent | React.KeyboardEvent) => {
    lastFocused.current = event.currentTarget as HTMLElement;
    setSelected(index);
  };

  const growth = (index: number) => {
    if (hovered === null) return 1;
    return hovered === index ? 2 : 0.5;
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3 md:flex md:h-[420px] md:gap-3">
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            type="button"
            aria-label={`Ampliar: ${image.alt}`}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson/50 md:aspect-auto md:h-full"
            style={{ flexGrow: 1, flexBasis: 0 }}
            animate={{ flexGrow: growth(index) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(index)}
            onBlur={() => setHovered(null)}
            onClick={(event) => open(index, event)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover"
            />

            {/* Velo que se retira en la imagen activa */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-ivory"
              initial={false}
              animate={{ opacity: hovered === index ? 0 : 0.28 }}
              transition={{ duration: 0.3 }}
            />

            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ivory/80 to-transparent p-4 text-left text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-sm">
              {image.alt}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            /* Fondo oscuro: el original usaba `bg-white bg-opacity-95` con los
               controles en `text-white`, que sobre este sitio claro los dejaba
               invisibles. */
            className="fixed inset-0 z-50 flex items-center justify-center bg-ivory/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              onClick={close}
            >
              <X className="h-7 w-7" />
            </button>

            {images.length > 1 ? (
              <button
                type="button"
                aria-label="Anterior"
                className="absolute left-2 z-10 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
                onClick={(event) => {
                  event.stopPropagation();
                  prev();
                }}
              >
                <ChevronLeft className="h-9 w-9" />
              </button>
            ) : null}

            <div
              className="relative max-h-[85vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                key={selected}
                src={images[selected].src}
                alt={images[selected].alt}
                className="max-h-[85vh] w-full rounded-2xl object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {images.length > 1 ? (
              <button
                type="button"
                aria-label="Siguiente"
                className="absolute right-2 z-10 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
                onClick={(event) => {
                  event.stopPropagation();
                  next();
                }}
              >
                <ChevronRight className="h-9 w-9" />
              </button>
            ) : null}

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-center text-xs text-white">
              <span className="tabular-nums">
                {selected + 1} / {images.length}
              </span>
              <span className="ml-2 hidden text-white/60 sm:inline">{images[selected].alt}</span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default ExpandableGallery;
