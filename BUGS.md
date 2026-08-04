# Incidencias activas

## Hostinger no sirve assets de Next.js — 2026-08-04

### Síntoma

`https://devruby.org/` devuelve HTML 200, pero la interfaz se muestra sin CSS
ni hidratación de JavaScript.

### Reproducción pública

1. Abrir `https://devruby.org/`.
2. Extraer uno de los assets que referencia su HTML, por ejemplo
   `/_next/static/css/8de5546e2bbe2e2b.css`.
3. Solicitarlo: responde HTTP 404 con cuerpo `Not Found` y cabeceras
   `platform: hostinger`, `server: hcdn`.
4. El navegador registra 404 para ambos CSS y para los chunks de
   `/_next/static/chunks/*`.

### Evidencia del hosting

- La web está habilitada como Node.js/Next.js, Node 22, con salida `.next`.
- Los builds `019fc796-6807-7173-8e28-9969cd8c11c8` y
  `019fca54-40e6-7174-9569-1011f7c9ad0a` finalizaron correctamente.
- El último build generó 33 rutas y no reportó errores de compilación.
- Un redeploy no corrigió los 404 de los assets.

### Diagnóstico

El proxy/servidor estático de Hostinger sirve o enruta el HTML de la aplicación
pero no resuelve `/_next/static/*` desde el directorio Node.js. No es una
regresión del CSS de la aplicación ni una caché del navegador.

### Acción requerida en hPanel/soporte

Regenerar la configuración Node.js/`.htaccess` y verificar que todas las rutas,
incluido `/_next/static/*`, se reenvían o se sirven desde
`/home/u750364973/domains/devruby.org/nodejs/.next/static`. Si la configuración
ya se regeneró, abrir ticket con Hostinger con el UUID del último build y la
respuesta 404 descrita arriba.
