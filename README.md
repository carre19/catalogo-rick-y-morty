# Catálogo Rick and Morty

**Alumno:** Gianluca Carrara

Catálogo de personajes de Rick and Morty hecho con React, React Router y Ant Design, consumiendo datos en vivo desde una API pública.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## API utilizada

[Rick and Morty API](https://rickandmortyapi.com/documentation) — API pública y gratuita, sin necesidad de registro ni API key.

## Endpoints consumidos

| Endpoint | Uso |
| --- | --- |
| `GET /api/character` | Listado de personajes en `/catalogo`, con paginación |
| `GET /api/character/?name=:nombre` | Búsqueda por nombre desde `/catalogo?buscar=:nombre` |
| `GET /api/character/:id` | Detalle de un personaje en `/catalogo/:id` |

## Rutas de la app

- `/` — Home con presentación del catálogo.
- `/catalogo` — Listado de personajes, con buscador por nombre (`?buscar=`).
- `/catalogo/:id` — Detalle de un personaje.
- `*` — Página 404 para cualquier ruta inexistente.
