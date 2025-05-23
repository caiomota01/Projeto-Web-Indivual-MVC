const db = require('../config/db');

exports.criarTarefa = (dados) => {
  const query = `INSERT INTO tarefa (titulo, descricao, status, data_desejada, data_limite, importancia, progresso, usuario_id, categoria_id, origem_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
  return db.query(query, dados);
};

exports.listarTarefas = () => {
  return db.query('SELECT * FROM tasks');
};

exports.editarTarefa = (dados) => {
  const query = `UPDATE tarefa SET titulo = $1, descricao = $2, status = $3, data_desejada = $4, data_limite = $5, importancia = $6, progresso = $7, usuario_id = $8, categoria_id = $9, origem_id = $10 WHERE id = $11 RETURNING *`;
  return db.query(query, dados);
};

exports.excluirTarefa = (id) => {
  return db.query('DELETE FROM tarefa WHERE id = $1 RETURNING *', [id]);
}; 