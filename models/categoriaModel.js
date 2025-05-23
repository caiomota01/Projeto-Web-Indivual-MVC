const db = require('../config/db');

exports.criarCategoria = (dados) => {
  const query = 'INSERT INTO categoria (nome, prioridade) VALUES ($1, $2) RETURNING *';
  return db.query(query, dados);
};

exports.listarCategorias = () => {
  return db.query('SELECT * FROM categories');
};

exports.editarCategoria = (dados) => {
  const query = 'UPDATE categoria SET nome = $1, prioridade = $2 WHERE id = $3 RETURNING *';
  return db.query(query, dados);
};

exports.excluirCategoria = (id) => {
  return db.query('DELETE FROM categoria WHERE id = $1 RETURNING *', [id]);
}; 