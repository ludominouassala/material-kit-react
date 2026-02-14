import type { Product } from 'src/products/product.types';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Box,
  Chip,
  Stack,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { deleteProduct, getProductById } from 'src/products/product.service';

export function ProductDetailsView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [perfume, setPerfume] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then(setPerfume)
      .catch((error) => {
        console.error('Erro ao buscar perfume:', error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    const confirmDelete = window.confirm(
      'Tem certeza que deseja eliminar este perfume?'
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      navigate('/products'); // 🔄 volta automaticamente
    } catch (error) {
      console.error('Erro ao eliminar perfume:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
  };

  if (loading) {
    return (
      <DashboardContent>
        <CircularProgress />
      </DashboardContent>
    );
  }

  if (!perfume) {
    return (
      <DashboardContent>
        <Typography>Perfume não encontrado</Typography>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {perfume.nome}
      </Typography>

      <Stack spacing={2}>
        <Typography>
          <strong>Marca:</strong> {perfume.marca || '—'}
        </Typography>

        <Typography>
          <strong>Descrição:</strong> {perfume.descricao || '—'}
        </Typography>

        <Typography>
          <strong>Preço:</strong> {perfume.preco} MT
        </Typography>

        <Chip
          label={perfume.disponibilidade || 'indisponível'}
          color={
            perfume.disponibilidade === 'disponível'
              ? 'success'
              : 'default'
          }
        />

        {/* BOTÕES ADMIN */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
          >
            Editar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </Box>
      </Stack>
    </DashboardContent>
  );
}