const db = require('../config/db');

exports.criarOrigem = (dados) => {
  const query = 'INSERT INTO origem (nome, relevancia) VALUES ($1, $2) RETURNING *';
  return db.query(query, dados);
};

exports.listarOrigens = () => {
  return db.query('SELECT * FROM origins');
};

exports.editarOrigem = (dados) => {
  const query = 'UPDATE origem SET nome = $1, relevancia = $2 WHERE id = $3 RETURNING *';
  return db.query(query, dados);
};

exports.excluirOrigem = (id) => {
  return db.query('DELETE FROM origem WHERE id = $1 RETURNING *', [id]);
}; 