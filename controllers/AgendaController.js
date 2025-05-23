const db = require('../config/db');

// Criar uma nova agenda
exports.criarAgenda = async (req, res) => {
  const { tarefa_id, data_inicio, data_fim, anotacoes } = req.body;
  const query = 'INSERT INTO agenda (tarefa_id, data_inicio, data_fim, anotacoes) VALUES ($1, $2, $3, $4) RETURNING *';
  try {
    const result = await db.query(query, [tarefa_id, data_inicio, data_fim, anotacoes]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as agendas
exports.listarAgendas = async (req, res) => {
  const query = 'SELECT * FROM agenda';
  try {
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma agenda
exports.editarAgenda = async (req, res) => {
  const { id } = req.params;
  const { tarefa_id, data_inicio, data_fim, anotacoes } = req.body;
  const query = 'UPDATE agenda SET tarefa_id = $1, data_inicio = $2, data_fim = $3, anotacoes = $4 WHERE id = $5 RETURNING *';
  try {
    const result = await db.query(query, [tarefa_id, data_inicio, data_fim, anotacoes, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Agenda não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma agenda
exports.excluirAgenda = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM agenda WHERE id = $1 RETURNING *';
  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Agenda não encontrada' });
    }
    res.status(200).json({ message: 'Agenda excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 