# Consultora Ruby — Landing moderna (Next.js + Tailwind + Anime.js)

Incluye:
- **Aurora** animada con `animejs`
- Primitivas estilo **Animate UI** (FadeIn)
- Componentes estilo **Magic UI** (ShineBorder, Spotlight, Magnetic)
- `animate.css` listo para micro-animaciones

## Requisitos
- Node.js 18+ (recomendado 20)

## Instalación
```bash
npm i
npm run dev
```

## Dónde editar contenido
- `components/sections/*` (textos y secciones)
- Colores: `tailwind.config.ts`
- Tipografías: `app/layout.tsx`

## Integración de formulario
El formulario actual es demo. Puedes crear un endpoint en:
- `app/api/contact/route.ts` (ej. enviar email, CRM, etc.)
