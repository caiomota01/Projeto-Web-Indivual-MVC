const origemModel = require('../models/origemModel');

// Criar uma nova origem
exports.criarOrigem = async (req, res) => {
  const { nome, relevancia } = req.body;
  const values = [nome, relevancia];
  try {
    const result = await origemModel.criarOrigem(values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as origens
exports.listarOrigens = async (req, res) => {
  try {
    const result = await origemModel.listarOrigens();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma origem
exports.editarOrigem = async (req, res) => {
  const { id } = req.params;
  const { nome, relevancia } = req.body;
  const values = [nome, relevancia, id];
  try {
    const result = await origemModel.editarOrigem(values);
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
  try {
    const result = await origemModel.excluirOrigem(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Origem não encontrada' });
    }
    res.status(200).json({ message: 'Origem excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 