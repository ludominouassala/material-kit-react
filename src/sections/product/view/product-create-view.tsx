import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { createProduct } from 'src/products/product.service';
import { ProductForm } from 'src/products/components/product-form';

export function ProductCreateView() {
  const navigate = useNavigate();

  const handleCreate = async (formData: FormData) => {
    const product = await createProduct(formData);
    navigate(`/products/${product.id}`);
  };

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Criar Produto
      </Typography>

      <ProductForm onSubmit={handleCreate} />
    </DashboardContent>
  );
}