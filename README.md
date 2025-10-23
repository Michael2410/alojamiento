# Alojamiento Estudiantil (Next.js + Prisma)

Aplicación web para publicar y buscar alojamientos estudiantiles. Construida con Next.js 14 (App Router), TypeScript, Tailwind CSS y Prisma ORM con SQLite.

## Stack
- Next.js 14 + App Router (`app/`)
- React 18 + TypeScript
- Tailwind CSS 3
- Prisma ORM 5 + SQLite

## Requisitos
- Node.js 18 o superior (recomendado LTS)
- npm 9+ (incluido con Node 18)

## Configuración rápida
1) Clonar e instalar dependencias
```
npm install
```

2) Variables de entorno
- Ya viene un `.env` listo para desarrollo con SQLite:
```
DATABASE_URL="file:./prisma/dev.db"
```
- Si lo necesitas, puedes apuntar a otra ruta de archivo SQLite.

3) Generar base de datos y migraciones
```
npm run prisma:migrate
```
Esto crea `prisma/dev.db` y aplica el esquema definido en `prisma/schema.prisma`.

4) (Opcional) Poblar datos de ejemplo
```
npm run prisma:seed
```
Crea un usuario anfitrión y varios alojamientos de prueba.

5) Levantar el servidor de desarrollo
```
npm run dev
```
Visita http://localhost:3000

## Scripts útiles
- `npm run dev` — Inicia Next.js en modo desarrollo.
- `npm run build` — Compila para producción.
- `npm run start` — Sirve la build de producción.
- `npm run prisma:migrate` — Ejecuta `prisma migrate dev --name init` (crea/actualiza la DB local).
- `npm run prisma:seed` — Ejecuta el seed `prisma/seed.js`.
- `npm run prisma:studio` — Abre Prisma Studio para explorar la DB en navegador.

## Estructura clave
- `app/layout.tsx` — Layout raíz, Navbar, Footer y estilos globales.
- `app/page.tsx` — Home con carrusel e invitación a buscar.
- `app/login/page.tsx` — Login simple por email (usa `/api/auth`).
- `app/alojamientos/page.tsx` — Listado con filtros y cards de alojamientos.
- `app/alojamientos/[id]/page.tsx` — Detalle de un alojamiento y reserva.
- `components/` — UI: `Navbar`, `Footer`, `ListingCard`, `FiltersBar`, `Carousel`, etc.
- `app/api/*` — Rutas API (alojamientos, usuarios, reservas, mensajes, auth).
- `prisma/schema.prisma` — Esquema de la base de datos.
- `prisma/seed.js` — Datos de ejemplo.
- `app/globals.css` + `tailwind.config.cjs` — Estilos y tema (color `primary`).

## Datos y autenticación
- DB: SQLite local (archivo en `prisma/dev.db`).
- Login: vía `/api/auth` por email. Con el seed, puedes usar `admin@example.com` para ingresar rápidamente (rol anfitrión). El estado de usuario se guarda en `localStorage` (demo simple).

## API principal
- `GET /api/alojamientos` — Lista alojamientos. Filtros opcionales por query:
  - `universidad`, `tipo`, `min`, `max`.
- `GET /api/alojamientos?id=ID` — Obtiene un alojamiento por id (incluye `usuario`).
- `POST /api/alojamientos` — Crea. Campos: `titulo`, `descripcion`, `precio`, `universidad`, `tipo`, `imagen?`, `usuarioId`, `verificado?`.
- `PUT /api/alojamientos` — Actualiza por `id`.
- `DELETE /api/alojamientos?id=ID` — Borra.
- `POST /api/auth` — Login por email existente.
- `GET/POST /api/usuarios` — Lista y crea usuarios.
- Consultar otros endpoints en `app/api/*` (reservas, mensajes).

## Personalización de estilos
- Paleta: en `tailwind.config.cjs` (color `primary`).
- Utilidades globales en `app/globals.css`:
  - `.btn`, `.btn-primary`, `.btn-outline`
  - `.card`, `.card-body`
  - `.input`, `.select`
  - `.badge`, `.badge-success`
- Imágenes del carrusel en `public/assets/carrucel`.

## Despliegue (producción)
1) Construir
```
npm run build
```
2) Iniciar
```
npm run start
```
3) Base de datos
- Para entorno real puedes seguir con SQLite (archivo) o migrar a otro proveedor (PostgreSQL, MySQL). Cambia `provider` y `DATABASE_URL` en `prisma/schema.prisma` y `.env`, y ejecuta migraciones de nuevo.

## Solución de problemas
- Prisma Client no generado: `npx prisma generate`.
- Reset DB en desarrollo: `npx prisma migrate reset` (elimina y recrea la DB, vuelve a correr seed si lo eliges).
- Conflictos de estilos: reinicia el servidor de dev tras cambios grandes en Tailwind.

---
¿Quieres que deje un script `prisma:migrate:reset` y/o un `.env.example`? Puedo agregarlos.
