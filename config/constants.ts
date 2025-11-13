export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://gutendex.com',
  ENDPOINTS: {
    BOOKS: '/books',
  },
  DEFAULT_PAGE: 1,
  BOOKS_LIMIT: 10,
};

export const UI_CONFIG = {
  LOADING_TEXT: 'Cargando libros...',
  ERROR_TEXT: 'No se pudieron cargar los libros',
  RETRY_TEXT: 'Reintentar',
  UNKNOWN_AUTHOR: 'Autor desconocido',
};
