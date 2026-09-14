# Incidencias activas

## El formulario de contacto no envía correos — 2026-09-14 (abierta)

**Síntoma:** cualquier envío del formulario de `/contacto` (y de las landings de
España y EE. UU.) muestra "No se pudo enviar" y ningún correo llega a
`soporte@devruby.org`.

**Reproducción:** `POST https://devruby.org/api/contact` con un JSON válido
responde HTTP 500 con `{"ok":false,"error":"Falta variable de entorno: SMTP_HOST"}`.

**Causa raíz:** el sitio Node.js de Hostinger (`u750364973` / `devruby.org`)
**no tiene ninguna variable de entorno configurada**: la API de Hostinger
devuelve la lista vacía y no existe `.env` en el servidor. `app/api/contact/route.ts`
exige `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` y
`CONTACT_TO` mediante `mustEnv`, así que falla en la primera antes de tocar
nodemailer. No es un problema de código, DNS ni de nodemailer 9: el dominio ya
tiene MX, SPF y DKIM de Hostinger Mail correctos.

**Solución pendiente:** cargar las seis variables en hPanel > Node.js >
Variables de entorno (o vía API `replaceNodeJsEnvironmentVariables`) con las
credenciales del buzón `soporte@devruby.org` de Hostinger Mail
(`smtp.hostinger.com`, puerto 465 con SSL), reiniciar o reconstruir la app y
repetir el POST de prueba hasta obtener `{"ok":true}` y el correo en el buzón.
Después, purgar la caché del sitio (regla operativa ya conocida).

**Mejora sugerida:** el `catch` del endpoint devuelve al navegador el mensaje
crudo de la excepción (`e.message`), lo que expone nombres de variables y
errores SMTP al público. Conviene registrar el error en servidor y responder un
texto genérico.

Nota: los `WARN` "Server Reference ID did not match the expected format" de los
logs de runtime son sondeos de bots contra server actions y no tienen relación.

## Auditoría de indexación — 2026-08-10 (corregida)

Auditoría de las 28 rutas contra un servidor de producción real. Todo lo listado
abajo está corregido y verificado; queda un único punto abierto al final.

| Problema | Estado |
| --- | --- |
| `/servicios/toString`, `/espana/constructor`, etc. devolvían **HTTP 500** en vez de 404: los guards usaban `value in catalog`, que acierta sobre `Object.prototype` | Corregido con `Object.hasOwn` en los 3 catálogos |
| Las 4 páginas `/us/[service]` se servían con `lang` español | `lang="en-US"` en su `<main>` |
| Sin `hreflang` entre las campañas ES y US | Clúster recíproco es-ES / en-US / x-default en las 10 páginas |
| `/espana/*` y `/us/*` sin `og:image` (el `openGraph` del hijo reemplaza al del padre, no hace merge) | `ogImages` centralizado en `lib/seo.ts` |
| `og:image` en SVG en 6 páginas (Facebook, LinkedIn, WhatsApp y X no lo renderizan) | Sustituido por `og-devruby.png` 1200×630 |
| `lastModified: new Date()` marcaba las 26 URLs como modificadas en cada deploy | `CONTENT_UPDATED` fijo en `app/sitemap.ts` |
| Sitemap con los 8 slugs de campaña hardcodeados | Derivado de `spainServiceSlugs` / `usServiceSlugs` |
| `/privacidad` indexable pero fuera del sitemap | Añadida (26 URLs) |
| `/contacto` sin `<h1>` | `<h1>` + copy de entrada |
| Descriptions de `/` y `/proceso` por encima de 160 caracteres | Acortadas |
| `ProfessionalService` repetido sin `@id`, `sameAs` vacío, logo en SVG | `@id` estable, `sameAs` eliminado, logo PNG |

Verificado en vivo: 26/26 rutas con 200, un solo `<h1>`, canonical
autorreferencial y `og:image` PNG; clúster hreflang con reciprocidad completa;
JSON-LD parsea en las 15 páginas con structured data; `noindex` intacto en las
dos políticas de cliente. Tests: 20/20 (4 nuevos de regresión).

### Canibalización — resuelta reescribiendo el copy (2026-08-10)

El origen era texto compartido literalmente: `headline` idéntico entre
`/servicios/seguridad-tecnica` y `/espana/auditoria-seguridad-aplicaciones`, e
`intro` casi idéntico en ambos pares.

Las dos landings de España se reescribieron para su público real en lugar de
repetir el catálogo general:

- **Automatización**: administración de PYME con gestoría externa. Cierre de mes,
  conciliación bancaria, remesas SEPA, traspaso a la asesoría y factura
  electrónica B2B.
- **Auditoría**: el detonante español no es la sanción sino el cuestionario de
  seguridad de un cliente, el pliego de licitación o la due diligence. Informe en
  castellano pensado para adjuntarse a esos procesos.

Solape de trigramas frente a una base de 38,3 % entre hermanas de plantilla:

| Par | Antes | Después |
| --- | --- | --- |
| `seguridad-tecnica` ↔ `auditoria-seguridad-aplicaciones` | 55,3 % | **18,8 %** |
| `automatizacion-de-procesos` (general ↔ España) | 47,6 % | **15,6 %** |

Ambos quedan por debajo del ruido de plantilla, así que el solape restante es
navbar y footer. `noindex` estuvo descartado desde el principio: las landings
reciben tráfico de Ads y se pidieron para indexación orgánica.

Sin fechas regulatorias concretas en el copy (el calendario de Verifactu y de la
factura electrónica B2B ha cambiado varias veces): se remite a la asesoría del
cliente y se declara explícitamente que DEVRUBY no presta asesoramiento fiscal
ni legal, en línea con el criterio ya aplicado en el resto del sitio.

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


## ChunkLoadError en devruby.org por HTML cacheado en el CDN — 2026-08-18

**Síntoma:** "Application error: a client-side exception has occurred" en la
portada. En consola, 404 de `/devruby-assets/_next/static/chunks/978-*.js`,
`app/page-*.js`, `app/layout-*.js` y `main-app-*.js`, seguidos de
`Uncaught ChunkLoadError: Loading chunk 978 failed`.

**Causa raíz:** Next 15 responde las páginas prerenderizadas con
`cache-control: s-maxage=31536000`. El CDN de Hostinger (`hcdn`) lo respeta al
pie de la letra y guarda el HTML un año sin revalidar. Tras el despliegue del
10-ago-2026 06:04 UTC cambiaron los hashes de varios chunks, pero los edges
seguían sirviendo HTML anterior al despliegue (edad medida: 5 y 8 días, y hasta
13 días el 18-ago), que apunta a hashes ya borrados del disco. Los chunks que no
cambiaron entre builds seguían dando 200; solo fallaban los que sí cambiaron, de
ahí que el fallo pareciera aleatorio.

**Por qué funcionaba en incógnito:** el perfil normal revalidaba su copia en
disco contra el CDN, que confirmaba su propio HTML caducado (mismo ETag), así
que el navegador conservaba indefinidamente la página rota. Además cada edge
tenía una copia distinta (`imm-edge4` vs `imm-edge6`), así que el resultado
dependía del edge que tocara.

**Diagnóstico reproducible:** `curl https://devruby.org/` devolvía HTML con
`x-hcdn-cache-status: HIT` y `age` de días apuntando a chunks 404; con
`?cachebust=N` la respuesta era `DYNAMIC` (origen) y todos sus chunks daban 200.

**Solución aplicada:**
1. Purga de caché del sitio en Hostinger (`clearWebsiteCache` sobre
   `u750364973` / `devruby.org`). Verificado: la portada y las 26 URLs del
   sitemap responden 200 y ningún chunk referenciado da 404.
2. `next.config.mjs` añade `headers()` con
   `public, max-age=0, s-maxage=300, stale-while-revalidate=86400` para todo lo
   que no cuelgue de `_next/` ni `devruby-assets/`, de modo que el HTML deje de
   ser cacheable un año mientras los assets con hash siguen inmutables.
   Desplegado el 19-ago-2026 (commit `039e6b6`, build
   `01a01783-6d70-7231-b092-af8d35131a76`) y verificado en producción: las 26
   URLs del sitemap responden 200 con la cabecera nueva y los 30 chunks que
   referencian resuelven; los assets con hash conservan
   `max-age=31536000, immutable`.

**Regla operativa:** purgar la caché del sitio en Hostinger después de cada
despliegue. Sin eso, el HTML viejo sobrevive al build nuevo.

## Copia local corrupta — detectada 2026-08-18

18 archivos fuente quedaron en 0 bytes (`app/layout.tsx`, `app/sitemap.ts`,
`lib/seo.ts`, `lib/services-catalog.ts`, `lib/spain-campaign.ts`,
`lib/us-campaign.ts`, las `page.tsx` de proceso/proyectos/servicios/nosotros/
contacto/us/espana y sus rutas dinámicas, `components/sections/spain-service-page.tsx`,
`tests/site.test.mjs`), con fecha 10-ago-2026 02:02. El repositorio git también
está dañado: `.git/objects/86/8449e3…` vacío y `refs/heads/main` con puntero
sha1 inválido.

Producción **no** está afectada: sirve un build íntegro del 10-ago 06:04.

**Recuperada el 19-ago-2026.** El commit local dañado (`868449e`) estaba
íntegro en `origin/main`, así que no se perdió trabajo: se sustituyó el `.git`
por un clon limpio y se restauraron los 18 archivos desde `HEAD`. Verificado con
`git fsck` limpio, `tsc --noEmit` sin errores, `next build` generando 33 rutas y
20/20 tests. `BUGS.md` también estaba vaciado y se restauró desde git.

No se determinó la causa: 18 archivos y un objeto de git truncados a 0 bytes a
la misma hora apuntan a un corte de energía o un fallo del sistema de archivos,
no a nada del proyecto. Si se repite, revisar `dmesg` y el SMART del disco.

## Vulnerabilidades altas en el build de Hostinger — 2026-08-19 (corregida)

El `npm install` del despliegue reportaba 3 avisos altos. No era una regresión:
son avisos publicados después de la ronda de parcheo del 30-jul, y uno apunta
justo a la versión que entonces se fijó como parche.

| Paquete | Estaba | Aviso | Ahora |
| --- | --- | --- | --- |
| `brace-expansion` | 5.0.8 | GHSA-rgw5-rvv9-x895, DoS por arrays intermedios sin límite que evade la mitigación de CVE-2026-14257 | 5.0.9 |
| `js-yaml` | 4.3.0 | GHSA-5p4m-2wfm-xmqj, consumo cuadrático de CPU al resolver `!!omap` | 4.3.1 |
| `nanoid` | 3.3.16 | GHSA-2v37-7h3g-55p8, bucle infinito con `size` cero | 3.3.18 |

Decisiones al parchear:

- El `override` de `brace-expansion` apuntaba a `^5.0.8`, la versión afectada.
  Sube a `^5.0.9`. El override sigue haciendo falta: las líneas 1.x y 2.x que
  arrastra la cadena de `eslint` no reciben el parche.
- `js-yaml` se fija con `override` a `^4.3.1` en lugar de saltar a la 5.x, para
  no arriesgar la compatibilidad con `eslint` 8.
- `nanoid` no se toca directamente: subir `postcss` a `^8.5.26` basta, porque su
  rango `^3.3.17` ya admite la 3.3.18.

`npm audit` queda en 0, también con `--omit=dev`. Verificado en local con `tsc`
limpio, 20/20 tests, `next build` con las 33 rutas y `npm ci --dry-run`; y en el
servidor, cuyo log de build ahora imprime `found 0 vulnerabilities`
(commit `d049e4d`, build `01a017ad-10c9-738f-b209-d9843379f555`).
