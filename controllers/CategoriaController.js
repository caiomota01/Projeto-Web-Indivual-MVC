const db = require('../config/db');

// Criar uma nova categoria
exports.criarCategoria = async (req, res) => {
  const { nome, prioridade } = req.body;
  const query = 'INSERT INTO categoria (nome, prioridade) VALUES ($1, $2) RETURNING *';
  try {
    const result = await db.query(query, [nome, prioridade]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as categorias
exports.listarCategorias = async (req, res) => {
  const query = 'SELECT * FROM categoria';
  try {
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma categoria
exports.editarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome, prioridade } = req.body;
  const query = 'UPDATE categoria SET nome = $1, prioridade = $2 WHERE id = $3 RETURNING *';
  try {
    const result = await db.query(query, [nome, prioridade, id]);
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
  const query = 'DELETE FROM categoria WHERE id = $1 RETURNING *';
  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 