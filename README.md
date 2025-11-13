# Books List Application

Aplicación web desarrollada con Next.js 15 que consume la API pública de Gutendex para mostrar un catálogo de libros clásicos de Project Gutenberg.

## Descripción del Proyecto

Esta aplicación fue desarrollada como parte de un ejercicio técnico que consiste en crear una aplicación con Next.js 14+ y TypeScript que liste los nombres de libros obtenidos desde un endpoint público.

### Requisitos Implementados

1. Aplicación generada con Next.js 15.5.6 y TypeScript
2. Componente `BooksListClient` que muestra una lista de títulos de libros
3. Integración con API de Gutendex: `https://gutendex.com/books/?page=1`
4. Mapeo de los primeros 10 libros mostrando título y autor
5. Definición de interfaces TypeScript para Book y Author
6. Manejo completo de estados: loading, success y error

### Características Adicionales

- Página de detalle de libro con información completa
- Selector de formatos de descarga
- Sistema de loading states con skeleton screens
- Diseño responsive con Tailwind CSS 4
- Iconografía con Font Awesome
- Arquitectura DDD (Domain-Driven Design)
- Separación de Server y Client Components

## Stack Tecnológico

- **Framework**: Next.js 15.5.6
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Arquitectura**: App Router
- **Patrón de diseño**: DDD con Bounded Contexts

## Estructura del Proyecto

```
books-list-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página principal (Server Component)
│   ├── loading.tsx               # Loading UI
│   └── books/[id]/               # Ruta dinámica de detalles
│       ├── page.tsx
│       ├── loading.tsx
│       └── not-found.tsx
│
├── lib/                          # Lógica de negocio
│   ├── books/                    # Bounded Context: Books
│   │   ├── components/           # Componentes UI
│   │   ├── hooks/                # Custom hooks
│   │   ├── services/             # Servicios API
│   │   └── types/                # Definiciones TypeScript
│   │
│   └── shared/                   # Código compartido
│       ├── components/ui/        # Componentes reutilizables
│       └── utils/                # Utilidades
│
└── config/                       # Configuraciones
    └── constants.ts
```

## Arquitectura

La aplicación sigue el patrón **DDD (Domain-Driven Design)** ligero con las siguientes capas:

### Capas de la Arquitectura

1. **Capa de Presentación**: Componentes React en `lib/books/components/`
2. **Capa de Lógica**: Custom hooks en `lib/books/hooks/`
3. **Capa de Servicios**: Comunicación con API en `lib/books/services/`
4. **Capa de Tipos**: Interfaces TypeScript en `lib/books/types/`

### Flujo de Datos

```
Usuario → Server Component (fetch inicial) → Client Component → Hook → Service → API
```

## Instalación

### Prerrequisitos

- Node.js 20 o superior
- npm o pnpm

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd books-list-app
```

2. Instalar dependencias:
```bash
npm install
```

### Repositorio

El código fuente de este proyecto está disponible en:
[https://github.com/Salchichon057/books-list-application](https://github.com/Salchichon057/books-list-application)

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## Scripts Disponibles

- `npm run dev` - Ejecuta la aplicación en modo desarrollo con Turbopack
- `npm run build` - Genera el build de producción
- `npm start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter ESLint

## API Utilizada

**Gutendex API**: Servicio público que proporciona acceso a libros de Project Gutenberg.

- **Endpoint**: `https://gutendex.com/books/`
- **Documentación**: https://gutendex.com/

### Estructura de Respuesta

```json
{
  "count": 70000,
  "results": [
    {
      "id": 1,
      "title": "Book Title",
      "authors": [
        {
          "name": "Author Name",
          "birth_year": 1775,
          "death_year": 1817
        }
      ],
      "subjects": [],
      "languages": ["en"],
      "download_count": 195270,
      "formats": {}
    }
  ]
}
```

## Modelo de Datos

### Interface Book

```typescript
interface Book {
  id: number;
  title: string;
  authors: Author[];
  subjects: string[];
  bookshelves?: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}
```

### Interface Author

```typescript
interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}
```

## Componentes Principales

### BooksListClient

Client Component principal que:
- Recibe datos iniciales del Server Component
- Gestiona estados de loading, success y error
- Renderiza la grilla de libros

### BookCard

Componente de presentación que muestra:
- Título del libro con icono
- Nombre del autor con icono
- Número de descargas con icono
- Link a página de detalles

### BookDetailPage

Server Component que muestra:
- Portada del libro
- Información completa
- Temas y categorías
- Selector de formatos de descarga

## Manejo de Estados

La aplicación implementa tres estados principales:

1. **Loading**: Muestra skeleton screens mientras carga datos
2. **Success**: Renderiza los datos obtenidos
3. **Error**: Muestra mensaje de error con opción de reintentar

## Características de UX

- Skeleton screens para mejor percepción de velocidad
- Iconografía consistente con Font Awesome
- Diseño responsive mobile-first
- Estados de loading en todas las navegaciones
- Mensajes de error amigables
- Navegación fluida entre páginas

## Optimizaciones

- Server Components por defecto para mejor rendimiento
- Client Components solo donde se necesita interactividad
- Fetch inicial en servidor para SEO
- Loading states con convención `loading.tsx` de Next.js
- Componentes reutilizables y modulares

## Principios de Código

- Clean Code sin comentarios
- Componentes auto-descriptivos
- Separación de responsabilidades
- Hooks separados de componentes de vista
- TypeScript estricto sin uso de `any`
- Arquitectura escalable y mantenible

## Documentación Adicional

Para más detalles técnicos, consultar:
- [`info/document.md`](./info/document.md) - Software Design Document completo

## Criterios de Evaluación Cumplidos

- Estructuración del proyecto con DDD
- Uso adecuado de componentes y hooks
- Tipado TypeScript correcto
- Manejo completo de estados (loading, success, error)
- Separación de Server y Client Components
- Código limpio y mantenible
