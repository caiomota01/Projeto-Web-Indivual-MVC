const db = require('../config/db');

exports.criarOrigem = (dados) => {
  const query = 'INSERT INTO origins (name, relevance) VALUES ($1, $2) RETURNING *';
  return db.query(query, dados);
};

exports.listarOrigens = () => {
  return db.query('SELECT * FROM origins');
};

exports.editarOrigem = (dados) => {
  const query = 'UPDATE origins SET name = $1, relevance = $2 WHERE id = $3 RETURNING *';
  return db.query(query, dados);
};

exports.excluirOrigem = (id) => {
  return db.query('DELETE FROM origins WHERE id = $1 RETURNING *', [id]);
};