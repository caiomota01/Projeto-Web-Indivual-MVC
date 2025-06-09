const db = require('../config/db');

exports.criarTarefa = (dados) => {
  const query = `INSERT INTO tasks (title, description, status, desired_date, deadline, importance, progress, user_id, category_id, origin_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
  return db.query(query, dados);
};

exports.listarTarefas = () => {
  return db.query('SELECT * FROM tasks');
};

exports.editarTarefa = (dados) => {
  const query = `UPDATE tasks SET title = $1, description = $2, status = $3, desired_date = $4, deadline = $5, importance = $6, progress = $7, user_id = $8, category_id = $9, origin_id = $10 WHERE id = $11 RETURNING *`;
  return db.query(query, dados);
};

exports.excluirTarefa = (id) => {
  return db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
};