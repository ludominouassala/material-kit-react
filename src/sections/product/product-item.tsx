import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';


// ----------------------------------------------------------------------

export type ProductItemProps = {
  id: string;
  nome: string;
  marca: string;
  preco: number;
  precoSale?: number | null;
  disponibilidade?: string;
  status?: string;
  imagem?: string | null;
  cores?: string[];
};

export function ProductItem({ product }: { product: ProductItemProps }) {

  const navigate = useNavigate();

  // Status (sale ou info)
  const renderStatus =
    product.status && (
      <Label
        variant="inverted"
        color={product.status === 'sale' ? 'error' : 'info'}
        sx={{
          zIndex: 9,
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        {product.status}
      </Label>
    );

  // Imagem do produto, com fallback
  const renderImg = (
    <Box
      component="img"
      alt={product.nome}
      src={product.imagem || '/assets/placeholder.png'} // fallback
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  // Preço
  const renderPrice = (
    <Typography variant="subtitle1">
      {product.precoSale && (
        <Typography
          component="span"
          variant="body1"
          sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
        >
          {fCurrency(product.precoSale)}
        </Typography>
      )}
      &nbsp;{fCurrency(product.preco)}
    </Typography>
  );

  return (
    <Card
     onClick={() => navigate(`/products/${product.id}`)}
      sx={{
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': { boxShadow: 6 },
      }}
    
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.nome} - {product.marca}
        </Link>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ColorPreview colors={product.cores || []} />
          {renderPrice}
        </Box>
      </Stack>
    </Card>
  );
}