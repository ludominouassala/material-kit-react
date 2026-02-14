import { useState } from 'react';

import {
  Box,
  Stack,
  Alert,
  Button,
  Snackbar,
  TextField,
  CircularProgress,
} from '@mui/material';

import type { Product } from '../product.types';

type Props = {
  initialData?: Product | null;
  onSubmit: (data: FormData) => Promise<void>;
};

export function ProductForm({ initialData, onSubmit }: Props) {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [marca, setMarca] = useState(initialData?.marca || '');
  const [descricao, setDescricao] = useState(initialData?.descricao || '');
  const [preco, setPreco] = useState(initialData?.preco || 0);
  const [imagem, setImagem] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(
    initialData?.imagem || null
  );

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagem(file);

    // Preview local
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('marca', marca);
      formData.append('descricao', descricao);
      formData.append('preco', String(preco));

      if (imagem) {
        formData.append('imagem', imagem);
      }

      console.log('Enviando dados...'); // DEBUG

      await onSubmit(formData);

      setOpenSnackbar(true);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErrorSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
        />

        <TextField
          label="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          fullWidth
        />

        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          label="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          fullWidth
        />

        {/* Upload */}
        <Button variant="outlined" component="label">
          Upload Imagem
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>

        {/* Preview */}
        {preview && (
          <Box>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: 200,
                borderRadius: 8,
                marginTop: 10,
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Salvar'}
        </Button>
      </Stack>

      {/* Sucesso */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">
          Produto salvo com sucesso!
        </Alert>
      </Snackbar>

      {/* Erro */}
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbar(false)}
      >
        <Alert severity="error">
          Erro ao salvar produto!
        </Alert>
      </Snackbar>
    </>
  );
}