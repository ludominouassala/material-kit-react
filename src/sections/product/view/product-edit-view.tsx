import type { Product } from 'src/products/product.types';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Typography, CircularProgress } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { ProductForm } from 'src/products/components/product-form';
import { updateProduct, getProductById } from 'src/products/product.service';

export function ProductEditView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) {
    return (
      <DashboardContent>
        <CircularProgress />
      </DashboardContent>
    );
  }

  const handleUpdate = async (formData: FormData) => {
    if (!id) return;
    await updateProduct(id, formData);
    navigate(`/products/${id}`);
  };

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Editar Produto
      </Typography>

      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
      />
    </DashboardContent>
  );
}
