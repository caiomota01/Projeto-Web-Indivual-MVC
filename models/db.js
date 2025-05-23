require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true',
});

pool.connect()
  .then(() => console.log("Conectado ao banco de dados"))
  .catch((err) => console.error("Erro na conexão com o banco", err));

module.exports = pool;
