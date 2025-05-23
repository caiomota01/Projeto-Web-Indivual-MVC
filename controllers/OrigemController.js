const db = require('../config/db');

// Criar uma nova origem
exports.criarOrigem = async (req, res) => {
  const { nome, relevancia } = req.body;
  const query = 'INSERT INTO origem (nome, relevancia) VALUES ($1, $2) RETURNING *';
  try {
    const result = await db.query(query, [nome, relevancia]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as origens
exports.listarOrigens = async (req, res) => {
  const query = 'SELECT * FROM origem';
  try {
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma origem
exports.editarOrigem = async (req, res) => {
  const { id } = req.params;
  const { nome, relevancia } = req.body;
  const query = 'UPDATE origem SET nome = $1, relevancia = $2 WHERE id = $3 RETURNING *';
  try {
    const result = await db.query(query, [nome, relevancia, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Origem não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma origem
exports.excluirOrigem = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM origem WHERE id = $1 RETURNING *';
  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Origem não encontrada' });
    }
    res.status(200).json({ message: 'Origem excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 