import { api } from 'src/api/axios';

import type { Product } from './product.types';

// Criar produto
export async function createProduct(data: FormData) {
  const response = await api.post('/perfumes', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

// Buscar todos os produtos
export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>('/perfumes');
  return response.data;
}

// Buscar perfume por ID
export async function getProductById(id: string): Promise<Product> {
  const response = await api.get<Product>(`/perfumes/${id}`);
  return response.data;
}

// Atualizar produto
export async function updateProduct(id: string, data: FormData) {
  const response = await api.put(`/perfumes/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}


// (já preparando o terreno)
export async function deleteProduct(id: string) {
  await api.delete(`/perfumes/${id}`);
}