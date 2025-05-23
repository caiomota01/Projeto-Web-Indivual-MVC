const agendaModel = require('../models/agendaModel');

// Criar uma nova agenda
exports.criarAgenda = async (req, res) => {
  const { tarefa_id, data_inicio, data_fim, anotacoes } = req.body;
  const values = [tarefa_id, data_inicio, data_fim, anotacoes];
  try {
    const result = await agendaModel.criarAgenda(values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as agendas
exports.listarAgendas = async (req, res) => {
  try {
    const result = await agendaModel.listarAgendas();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma agenda
exports.editarAgenda = async (req, res) => {
  const { id } = req.params;
  const { tarefa_id, data_inicio, data_fim, anotacoes } = req.body;
  const values = [tarefa_id, data_inicio, data_fim, anotacoes, id];
  try {
    const result = await agendaModel.editarAgenda(values);
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
  try {
    const result = await agendaModel.excluirAgenda(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Agenda não encontrada' });
    }
    res.status(200).json({ message: 'Agenda excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 