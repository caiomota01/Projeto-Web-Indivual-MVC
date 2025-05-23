const categoriaModel = require('../models/categoriaModel');

// Criar uma nova categoria
exports.criarCategoria = async (req, res) => {
  const { nome, prioridade } = req.body;
  const values = [nome, prioridade];
  try {
    const result = await categoriaModel.criarCategoria(values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as categorias
exports.listarCategorias = async (req, res) => {
  try {
    const result = await categoriaModel.listarCategorias();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma categoria
exports.editarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome, prioridade } = req.body;
  const values = [nome, prioridade, id];
  try {
    const result = await categoriaModel.editarCategoria(values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma categoria
exports.excluirCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await categoriaModel.excluirCategoria(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 