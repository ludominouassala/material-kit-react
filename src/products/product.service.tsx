import { api } from 'src/api/axios';

import type { Product } from './product.types';

// Buscar todos os produtos
export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>('/perfumes');
  return response.data;
}

// (já preparando o terreno)
export async function deleteProduct(id: string) {
  await api.delete(`/perfumes/${id}`);
}