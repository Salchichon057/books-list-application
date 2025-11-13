import { BooksApiResponse } from '../types/book.types';
import { API_CONFIG } from '@/config/constants';

class BooksService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  async getBooks(page: number = API_CONFIG.DEFAULT_PAGE): Promise<BooksApiResponse> {
    try {
      const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.BOOKS}/?page=${page}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BooksApiResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al obtener libros: ${error.message}`);
      }
      throw new Error('Error desconocido al obtener libros');
    }
  }
}

export const booksService = new BooksService();
