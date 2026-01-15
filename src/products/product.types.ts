export interface Product {
  id: string;
  nome: string;
  marca: string;
  descricao?: string;
  preco: number;
  disponibilidade?: string;
  imagem: string | null;
  ativo: boolean;
  admin_id: string;
}