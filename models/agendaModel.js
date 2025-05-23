const db = require('../config/db');

exports.criarAgenda = (dados) => {
  const query = 'INSERT INTO agenda (tarefa_id, data_inicio, data_fim, anotacoes) VALUES ($1, $2, $3, $4) RETURNING *';
  return db.query(query, dados);
};

exports.listarAgendas = () => {
  return db.query('SELECT * FROM agenda');
};

exports.editarAgenda = (dados) => {
  const query = 'UPDATE agenda SET tarefa_id = $1, data_inicio = $2, data_fim = $3, anotacoes = $4 WHERE id = $5 RETURNING *';
  return db.query(query, dados);
};

exports.excluirAgenda = (id) => {
  return db.query('DELETE FROM agenda WHERE id = $1 RETURNING *', [id]);
}; 