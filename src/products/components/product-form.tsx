import { useState, useEffect } from 'react';

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
  const [disponibilidade, setDisponibilidade] = useState(
  initialData?.disponibilidade || "em stock"
);

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  // Atualiza preview caso haja initialData
  useEffect(() => {
    if (initialData?.imagem) {
      setPreview(
        initialData.imagem.startsWith('http')
          ? initialData.imagem
          : `/uploads/${initialData.imagem}`
      );
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      formData.append('disponibilidade', disponibilidade);
      
      if (imagem) formData.append('imagem', imagem);

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
        <TextField label="Nome" value={nome} onChange={e => setNome(e.target.value)} fullWidth />
        <TextField label="Marca" value={marca} onChange={e => setMarca(e.target.value)} fullWidth />
        <TextField
          label="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          label="Preço"
          type="number"
          value={preco}
          onChange={e => setPreco(Number(e.target.value))}
          fullWidth
        />

        <TextField
          select
          label="Disponibilidade"
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value)}
          SelectProps={{ native: true }}
          fullWidth
        >
        <option value="em stock">Em Stock</option>
        <option value="esgotado">Esgotado</option>
      </TextField>


        {/* Upload de imagem */}
        <Button variant="outlined" component="label">
          Upload Imagem
          <input type="file" hidden onChange={handleImageChange} />
        </Button>

        {/* Preview */}
        {preview && (
          <Box>
            <img
              src={preview}
              alt="Preview"
              style={{ width: 200, borderRadius: 8, marginTop: 10 }}
            />
          </Box>
        )}

        {/* Botão salvar */}
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Salvar'}
        </Button>
      </Stack>

      {/* Snackbar sucesso */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">Produto salvo com sucesso!</Alert>
      </Snackbar>

      {/* Snackbar erro */}
      <Snackbar open={errorSnackbar} autoHideDuration={3000} onClose={() => setErrorSnackbar(false)}>
        <Alert severity="error">Erro ao salvar produto!</Alert>
      </Snackbar>
    </>
  );
}