const tarefaModel = require('../models/tarefaModel');

// Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
  const { title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id } = req.body;
  const values = [title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id];
  try {
    const result = await tarefaModel.criarTarefa(values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarTarefas = async (req, res) => {
  try {
    const result = await tarefaModel.listarTarefas();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id } = req.body;
  const values = [title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id, id];
  try {
    const result = await tarefaModel.editarTarefa(values);
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
  try {
    const result = await tarefaModel.excluirTarefa(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 