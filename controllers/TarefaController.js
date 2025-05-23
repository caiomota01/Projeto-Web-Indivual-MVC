const db = require('../config/db');

// Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
  const { titulo, descricao, status, data_desejada, data_limite, importancia, progresso, usuario_id, categoria_id, origem_id } = req.body;
  const query = `INSERT INTO tarefa (titulo, descricao, status, data_desejada, data_limite, importancia, progresso, usuario_id, categoria_id, origem_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
  const values = [titulo, descricao, status, data_desejada, data_limite, importancia, progresso, usuario_id, categoria_id, origem_id];
  try {
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarTarefas = async (req, res) => {
  const query = 'SELECT * FROM tarefa';
  try {
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, data_desejada, data_limite, importancia, progresso, usuario_id, categoria_id, origem_id } = req.body;
  const query = `UPDATE tarefa SET titulo = $1, descricao = $2, status = $3, data_desejada = $4, data_limite = $5, importancia = $6, progresso = $7, usuario_id = $8, categoria_id = $9, origem_id = $10 WHERE id = $11 RETURNING *`;
  const values = [titulo, descricao, status, data_desejada, data_limite, importancia, progresso, usuario_id, categoria_id, origem_id, id];
  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tarefa WHERE id = $1 RETURNING *';
  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 