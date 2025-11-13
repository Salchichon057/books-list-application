# Software Design Document (SDD)

## Books List Application

## 1. Introducción

### 1.1 Propósito

Este documento describe el diseño técnico de una aplicación web que consume la API pública de Gutendex para mostrar un listado de libros con sus autores.

### 1.2 Alcance

Aplicación web básica que:

- Consume el endpoint público de Gutendex
- Muestra los primeros 10 libros
- Presenta el título de cada libro y el nombre del primer autor
- Maneja estados de carga, éxito y error

### 1.3 Stack Tecnológico

- **Framework:** Next.js 15
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4
- **Arquitectura:** App Router Architecture
- **Patrón de diseño:** DDD (Domain-Driven Design) Ligero con Bounded Contexts

---

## 2. Arquitectura del Sistema

### 2.1 Patrón Arquitectónico

**DDD Ligero con Bounded Contexts**

La aplicación está organizada en módulos que representan bounded contexts del dominio. Para este proyecto, tenemos un solo contexto: **Books**.

#### Principios aplicados:

- **Separación de responsabilidades**: Componentes UI, lógica de negocio y servicios API separados
- **Modularidad**: Código organizado por features/contextos
- **Reutilización**: Componentes y utilidades compartidas en `/shared`
- **Type Safety**: Uso de TypeScript en toda la aplicación

### 2.2 Estructura de Carpetas

```
books-list-app/
├── app/                                        # Next.js App Router
│   ├── layout.tsx                              # Layout principal con Font Awesome
│   ├── page.tsx                                # Página de inicio (/) - Server Component
│   ├── loading.tsx                             # Loading UI para página principal
│   ├── globals.css                             # Estilos globales Tailwind
│   └── books/                                  # Rutas dinámicas de libros
│       └── [id]/                               # Ruta dinámica para detalle de libro
│           ├── page.tsx                        # Página de detalle - Server Component
│           ├── loading.tsx                     # Loading UI para detalle
│           └── not-found.tsx                   # UI de 404 para libro no encontrado
│
├── lib/                                        # Lógica de negocio y utilidades
│   ├── books/                                  # Context: Books (Bounded Context)
│   │   ├── components/                         # Componentes UI del módulo
│   │   │   ├── BooksListClient.tsx             # Client Component principal
│   │   │   ├── BookCard.tsx                    # Card individual de libro
│   │   │   ├── BookError.tsx                   # UI de error
│   │   │   ├── BookLoading.tsx                 # UI de loading (spinner)
│   │   │   ├── BooksListSkeleton.tsx           # Skeleton para lista de libros
│   │   │   ├── BookDetailSkeleton.tsx          # Skeleton para detalle de libro
│   │   │   └── DownloadSelector.tsx            # Selector de formatos de descarga
│   │   │
│   │   ├── hooks/                              # Custom hooks del módulo
│   │   │   └── useBooks.ts                     # Hook para gestión de libros
│   │   │
│   │   ├── services/                           # Servicios/Lógica de negocio
│   │   │   └── books-service.ts                # Servicio API de libros
│   │   │
│   │   └── types/                              # Definiciones TypeScript
│   │       └── book.types.ts                   # Interfaces Book, Author, etc.
│   │
│   └── shared/                                 # Código compartido
│       ├── components/                         # Componentes reutilizables
│       │   ├── layouts/                        # Layouts compartidos (vacío)
│       │   └── ui/                             # Componentes UI genéricos
│       │       ├── Badge.tsx                   # Componente de badge
│       │       ├── Button.tsx                  # Componente de botón
│       │       ├── Card.tsx                    # Componente de card
│       │       ├── Skeleton.tsx                # Componente base de skeleton
│       │       └── Spinner.tsx                 # Indicador de carga
│       └── utils/                              # Utilidades compartidas
│           └── cn.ts                           # Función para combinar clases CSS
│
├── config/                                     # Configuraciones
│   └── constants.ts                            # Constantes globales (API config, UI config)
│
├── public/                                     # Archivos estáticos
│
├── .github/                                    # GitHub configurations
│   └── instructions/                           # Documentación del proyecto
│       ├── general.instructions.md             # Instrucciones generales de código
│       └── document.md                         # Software Design Document
│
├── .env.local                                  # Variables de entorno
├── postcss.config.mjs                          # Config PostCSS
├── next.config.ts                              # Config Next.js 15
├── tsconfig.json                               # Config TypeScript
├── eslint.config.mjs                           # Config ESLint
├── package.json                                # Dependencias del proyecto
└── README.md                                   # Documentación principal
```

### 2.3 Capas de la Arquitectura

#### **Capa de Presentación (UI)**

- **Ubicación:** `lib/books/components/`
- **Responsabilidad:** Renderizar la interfaz de usuario
- **Componentes:**
  - `BooksListClient.tsx`: Componente contenedor principal (Client Component)
  - `BookCard.tsx`: Presentación de cada libro
  - `BookLoading.tsx`: Estado de carga
  - `BookError.tsx`: Estado de error

#### **Capa de Lógica (Hooks)**

- **Ubicación:** `lib/books/hooks/`
- **Responsabilidad:** Gestionar estado y efectos secundarios
- **Componente:**
  - `useBooks.ts`: Custom hook que maneja fetch, estados y errores

#### **Capa de Servicios (Business Logic)**

- **Ubicación:** `lib/books/services/`
- **Responsabilidad:** Comunicación con APIs externas
- **Componente:**
  - `books-service.ts`: Clase BooksService con método `getBooks()`

#### **Capa de Tipos (Type Definitions)**

- **Ubicación:** `lib/books/types/`
- **Responsabilidad:** Definir contratos de datos
- **Archivo:**
  - `book.types.ts`: Interfaces TypeScript

---

## 3. Diagrama de Alto Nivel

### 3.1 Arquitectura del Sistema

```
┌────────────────────────────────────────────────────────────────┐
│                         USUARIO                                │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ↓
┌────────────────────────────────────────────────────────────────┐
│                    NAVEGADOR WEB                               │
│                                                                │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              NEXT.JS 15 APP ROUTER                        │ │
│  │                                                           │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  CAPA DE PRESENTACIÓN (UI Components)                │ │ │
│  │  │                                                      │ │ │
│  │  │  • BooksList.tsx     (Componente principal)          │ │ │
│  │  │  • BookCard.tsx      (Tarjeta individual)            │ │ │
│  │  │  • BookLoading.tsx   (Estado de carga)               │ │ │
│  │  │  • BookError.tsx     (Estado de error)               │ │ │
│  │  └────────────────┬─────────────────────────────────────┘ │ │
│  │                   │                                       │ │
│  │                   ↓                                       │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  CAPA DE LÓGICA (Custom Hooks)                       │ │ │
│  │  │                                                      │ │ │
│  │  │  • useBooks.ts                                       │ │ │
│  │  │    - Gestiona estados (loading, success, error)      │ │ │
│  │  │    - Maneja efectos secundarios                      │ │ │
│  │  │    - Coordina llamadas a servicios                   │ │ │
│  │  └────────────────┬─────────────────────────────────────┘ │ │
│  │                   │                                       │ │
│  │                   ↓                                       │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  CAPA DE SERVICIOS (Business Logic)                  │ │ │
│  │  │                                                      │ │ │
│  │  │  • BooksService.ts                                   │ │ │
│  │  │    - getBooks(page)                                  │ │ │
│  │  │    - Manejo de errores HTTP                          │ │ │
│  │  │    - Transformación de datos                         │ │ │
│  │  └────────────────┬─────────────────────────────────────┘ │ │
│  │                   │                                       │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  CAPA DE TIPOS (Type Definitions)                    │ │ │
│  │  │                                                      │ │ │
│  │  │  • book.types.ts                                     │ │ │
│  │  │    - Interface Book                                  │ │ │
│  │  │    - Interface Author                                │ │ │
│  │  │    - Interface BooksApiResponse                      │ │ │
│  │  │    - Type FetchStatus                                │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────┘ │
└───────────────────────────────┬────────────────────────────────┘
                                │
                                │ HTTP Request
                                │ GET /books/?page=1
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    API EXTERNA: GUTENDEX                        │
│                  https://gutendex.com/books                     │
│                                                                 │
│  Retorna JSON:                                                  │
│  {                                                              │
│    "count": 70000,                                              │
│    "results": [                                                 │
│      {                                                          │
│        "id": 1,                                                 │
│        "title": "Book Title",                                   │
│        "authors": [{...}]                                       │
│      }                                                          │
│    ]                                                            │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Flujo de Datos (Data Flow)

```
┌──────────────┐
│   Usuario    │
│  accede "/"  │
└──────┬───────┘
       │
       ↓
┌─────────────────────────────────┐
│   page.tsx (Server Component)   │
│   Hace fetch en servidor        │
│   Obtiene libros iniciales      │
└──────┬──────────────────────────┘
       │
       ↓
┌────────────────────────────────────┐
│  page.tsx renderiza                │
│  <BooksListClient                  │
│    initialBooks={libros}           │
│    initialError={error} />         │
└──────┬─────────────────────────────┘
       │
       ↓
┌────────────────────────────────┐
│  BooksListClient usa           │
│  useBooks({ initialBooks })    │
│  Estado inicial: 'success'     │
└──────┬─────────────────────────┘
       │
       ↓ Renderiza datos iniciales
       │
┌────────────────────────────────┐
│  Renderiza BookCard x10        │
│  (datos del servidor)          │
└──────┬─────────────────────────┘
       │
       ↓ Usuario hace clic en "Reintentar" (opcional)
       │
┌────────────────────────────────┐
│  refetch() se ejecuta          │
│  Estado cambia a 'loading'     │
│  Renderiza <BookLoading />     │
└──────┬─────────────────────────┘
       │
       ↓
┌────────────────────────────────┐
│  useBooks llama a              │
│  BooksService.getBooks()       │
└──────┬─────────────────────────┘
       │
       ↓
┌────────────────────────────────┐
│  BooksService hace fetch       │
│  desde cliente a Gutendex API  │
└──────┬─────────────────────────┘
       │
       ↓
    ┌──┴──┐
    │ ¿OK?│
    └──┬──┘
       │
   ┌───┴────┐
   │        │
  SÍ       NO
   │        │
   ↓        ↓
┌───────┐ ┌──────┐
│SUCCESS│ │ERROR │
└───┬───┘ └──┬───┘
    │        │
    ↓        ↓
┌─────────┐ ┌──────────┐
│ Limita  │ │ Captura  │
│ a 10    │ │ error    │
│ libros  │ │          │
└────┬────┘ └────┬─────┘
     │           │
     ↓           ↓
┌─────────┐ ┌──────────┐
│ Estado: │ │ Estado:  │
│'success'│ │ 'error'  │
└────┬────┘ └────┬─────┘
     │           │
     ↓           ↓
┌─────────┐ ┌──────────┐
│Renderiza│ │Renderiza │
│BookCard │ │BookError │
│ x10     │ │          │
└─────────┘ └──────────┘
```

### 3.3 Bounded Context: Books

```
┌─────────────────────────────────────────────────────────┐
│              BOUNDED CONTEXT: BOOKS                     │
│                                                         │
│  ┌────────────────────────────────────────────────┐     │
│  │  Server Component (app/page.tsx)               │     │
│  │  • Fetch inicial en servidor                   │     │
│  │  • Pasa datos a Client Component               │     │
│  └────────────────┬───────────────────────────────┘     │
│                   │                                     │
│                   ↓                                     │
│  ┌────────────────────────────────────────────────┐     │
│  │  Components (Presentación) - Client            │     │
│  │  • BooksListClient, BookCard, BookLoading,     │     │
│  │    BookError                                   │     │
│  └────────────────┬───────────────────────────────┘     │
│                   │                                     │
│                   ↓                                     │
│  ┌────────────────────────────────────────────────┐     │
│  │  Hooks (Gestión de Estado)                     │     │
│  │  • useBooks (recibe datos iniciales)           │     │
│  └────────────────┬───────────────────────────────┘     │
│                   │                                     │
│                   ↓                                     │
│  ┌────────────────────────────────────────────────┐     │
│  │  Services (Lógica de Negocio)                  │     │
│  │  • BooksService (funciona en server y client)  │     │
│  └────────────────┬───────────────────────────────┘     │
│                   │                                     │
│                   ↓                                     │
│  ┌────────────────────────────────────────────────┐     │
│  │  Types (Contratos de Datos)                    │     │
│  │  • Book, Author, BooksApiResponse, FetchStatus │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 4. Especificaciones Técnicas

### 4.1 Modelo de Datos

#### Interface: Author

**Propiedades:**

- `name`: string - Nombre del autor
- `birth_year`: number | null - Año de nacimiento
- `death_year`: number | null - Año de fallecimiento

#### Interface: Book

**Propiedades:**

- `id`: number - Identificador único del libro
- `title`: string - Título del libro
- `authors`: Author[] - Array de autores
- `summaries`: string[] - Array de resúmenes del libro
- `editors`: Author[] - Array de editores
- `translators`: Author[] - Array de traductores
- `subjects`: string[] - Lista de categorías/temas del libro
- `bookshelves`: string[] - Lista de estanterías/categorías adicionales
- `languages`: string[] - Lista de códigos de idioma (ISO 639-1)
- `copyright`: boolean - Si el libro está bajo copyright
- `media_type`: string - Tipo de media (Text, Audio, Image, Video, Collection)
- `formats`: Record<string, string> - Formatos disponibles y sus URLs
- `download_count`: number - Número de descargas del libro

#### Interface: BooksApiResponse

**Propiedades:**

- `count`: number - Total de libros disponibles
- `next`: string | null - URL de la siguiente página
- `previous`: string | null - URL de la página anterior
- `results`: Book[] - Array de libros

#### Type: FetchStatus

**Valores posibles:** `'idle' | 'loading' | 'success' | 'error'`

### 4.2 Servicios

#### BooksService

**Ubicación:** `lib/books/services/books-service.ts`

**Método principal:** `getBooks(page: number = 1)`

**Responsabilidades:**

- Realizar fetch al endpoint de Gutendex
- Manejar respuestas HTTP
- Transformar datos si es necesario
- Propagar errores apropiadamente

**Endpoint consumido:**

```
GET https://gutendex.com/books/?page=1
```

### 4.3 Custom Hooks

#### useBooks

**Ubicación:** `lib/books/hooks/useBooks.ts`

**Parámetros:**

- `page`: number (default: 1) - Número de página a consultar

**Retorna:**

- `books`: Book[] - Array de libros (máximo 10)
- `status`: FetchStatus - Estado actual del fetch
- `error`: Error | null - Objeto de error si ocurrió
- `refetch`: Function - Función para volver a cargar datos

**Responsabilidades:**

- Gestionar estado de libros
- Gestionar estados de carga (loading, success, error)
- Ejecutar fetch automáticamente al montar el componente
- Limitar resultados a 10 libros
- Proveer función de refetch manual

### 4.4 Componentes

#### BooksListClient (Componente Principal)

**Tipo:** Client Component  
**Props:**

- `initialBooks`: Book[] - Libros precargados desde el servidor
- `initialError`: string | null - Error inicial si ocurrió en servidor

**Responsabilidades:**

- Recibir datos iniciales del Server Component (page.tsx)
- Consumir el hook `useBooks` con datos iniciales
- Renderizar estados condicionales según `status`:
  - `loading`: Mostrar componente `BookLoading`
  - `error`: Mostrar componente `BookError`
  - `success`: Mapear y renderizar componentes `BookCard`
- Manejar refetch manual cuando usuario hace clic en "Reintentar"

#### BookCard

**Props:**

- `book`: Book - Objeto con datos del libro

**Responsabilidades:**

- Mostrar título del libro
- Mostrar nombre del primer autor
- Aplicar estilos con Tailwind CSS

#### BookLoading

**Props:** Ninguno

**Responsabilidades:**

- Mostrar indicador visual de carga (spinner o skeleton)
- Proporcionar feedback al usuario durante el fetch

#### BookError

**Props:**

- `error`: Error - Objeto de error
- `onRetry`: Function (opcional) - Callback para reintentar

**Responsabilidades:**

- Mostrar mensaje de error amigable al usuario
- Proporcionar botón para reintentar la carga (opcional)

---

## 5. Manejo de Errores

### 5.1 Estrategia de Manejo de Errores por Capas

#### **Service Layer (BooksService)**

**Responsabilidad:** Detectar y propagar errores de red y HTTP

**Estrategia:**

- Validar respuestas HTTP (códigos de estado)
- Capturar errores de red
- Transformar errores en mensajes descriptivos
- Propagar errores hacia la capa superior

**Tipos de validación:**

- Response status (200-299 = éxito)
- Timeout de conexión
- Formato de respuesta JSON válido

#### **Hook Layer (useBooks)**

**Responsabilidad:** Capturar errores del servicio y actualizar estado

**Estrategia:**

- Envolver llamadas a servicios en try-catch
- Convertir errores desconocidos en objetos Error
- Actualizar estado a 'error'
- Almacenar mensaje de error para UI

**Flujo:**

1. Cambiar estado a 'loading'
2. Intentar fetch mediante servicio
3. Si éxito: actualizar books y cambiar estado a 'success'
4. Si fallo: capturar error y cambiar estado a 'error'

#### **Component Layer (BookError)**

**Responsabilidad:** Presentar errores de forma amigable al usuario

**Estrategia:**

- Mostrar mensaje de error legible
- Ofrecer opción de reintentar (botón)
- Evitar mostrar detalles técnicos al usuario
- Mantener la UI funcional incluso en error

### 5.2 Tipos de Errores Contemplados

| Tipo de Error     | Origen                      | Manejo                                               |
| ----------------- | --------------------------- | ---------------------------------------------------- |
| **Network Error** | Sin conexión a internet     | Mensaje: "No se pudo conectar. Verifica tu conexión" |
| **HTTP 4xx**      | Error del cliente (ej: 404) | Mensaje: "Recurso no encontrado"                     |
| **HTTP 5xx**      | Error del servidor          | Mensaje: "Error del servidor. Intenta más tarde"     |
| **Timeout**       | Respuesta demorada          | Mensaje: "La solicitud tardó demasiado"              |
| **Parse Error**   | JSON inválido               | Mensaje: "Error al procesar los datos"               |

### 5.3 Estados de Error

La aplicación maneja los siguientes estados:

1. **idle**: Sin actividad, estado inicial
2. **loading**: Cargando datos, mostrar spinner
3. **success**: Datos cargados exitosamente
4. **error**: Error capturado, mostrar mensaje

---

## 6. Estilos y UI/UX

### 6.1 Sistema de Diseño

- **Framework CSS:** Tailwind CSS 4
- **Metodología:** Utility-first approach
- **Responsive Design:** Mobile-first

### 6.2 Componentes UI Base

**Ubicación:** `lib/shared/components/ui/`

**Componentes reutilizables:**

- **Button**: Botones con variantes (primary, secondary, outline)
- **Card**: Contenedor con sombra, bordes redondeados y padding
- **Spinner**: Indicador de carga animado

### 6.3 Principios de Diseño

**Jerarquía Visual:**

- Títulos: Typography scale clara (text-3xl, text-xl, text-base)
- Espaciado consistente: múltiplos de 4px (p-4, m-6, gap-8)
- Contraste: Texto legible sobre fondos

**Feedback Visual:**

- Estados hover en elementos interactivos
- Transiciones suaves (transition-colors, duration-200)
- Loading states visibles

**Responsive:**

- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid/Flex layouts adaptables
- Imágenes responsive

### 6.4 Convenciones de Estilo

**Colores Semánticos:**

- Primary: Acciones principales
- Secondary: Acciones secundarias
- Error: Estados de error y validación
- Success: Confirmaciones y estados exitosos
- Neutral: Textos y backgrounds

**Spacing System:**

- Container: max-width con padding lateral
- Cards: padding interno consistente
- Gap entre elementos: scale de 4px
