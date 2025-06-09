const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

const loadSampleData = async () => {
  const filePath = path.join(__dirname, 'sample-data.sql');
  const sql = fs.readFileSync(filePath, 'utf8');

  try {
    await pool.query(sql);
    console.log('Dados de exemplo carregados com sucesso!');
  } catch (err) {
    console.error('Erro ao carregar dados de exemplo:', err);
  } finally {
    await pool.end();
  }
};

loadSampleData();
