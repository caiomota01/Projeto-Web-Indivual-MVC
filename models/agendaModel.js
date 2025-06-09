const db = require('../config/db');

exports.criarAgenda = (dados) => {
  const query = 'INSERT INTO agenda (task_id, start_time, end_time, notes) VALUES ($1, $2, $3, $4) RETURNING *';
  return db.query(query, dados);
};

exports.listarAgendas = () => {
  return db.query('SELECT * FROM agenda');
};

exports.editarAgenda = (dados) => {
  const query = 'UPDATE agenda SET task_id = $1, start_time = $2, end_time = $3, notes = $4 WHERE id = $5 RETURNING *';
  return db.query(query, dados);
};

exports.excluirAgenda = (id) => {
  return db.query('DELETE FROM agenda WHERE id = $1 RETURNING *', [id]);
};