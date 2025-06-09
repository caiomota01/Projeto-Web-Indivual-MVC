const express = require('express');
const router = express.Router();

// Dashboard
router.get('/', (req, res) => {
  res.render('pages/dashboard', {
    pageTitle: 'Dashboard',
    currentPage: 'dashboard',
    pageScript: 'dashboard'
  });
});

router.get('/dashboard', (req, res) => {
  res.render('pages/dashboard', {
    pageTitle: 'Dashboard',
    currentPage: 'dashboard',
    pageScript: 'dashboard'
  });
});

// Tarefas
router.get('/tarefas', (req, res) => {
  res.render('pages/tarefas', {
    pageTitle: 'Tarefas',
    currentPage: 'tarefas',
    pageScript: 'tarefas'
  });
});

// Agenda
router.get('/agenda', (req, res) => {
  res.render('pages/agenda', {
    pageTitle: 'Agenda',
    currentPage: 'agenda',
    pageScript: 'agenda'
  });
});

// Gráficos
router.get('/graficos', (req, res) => {
  res.render('pages/graficos', {
    pageTitle: 'Gráficos',
    currentPage: 'graficos',
    pageScript: 'graficos'
  });
});

// Diário
router.get('/diario', (req, res) => {
  res.render('pages/diario', {
    pageTitle: 'Diário',
    currentPage: 'diario',
    pageScript: 'diario'
  });
});

// Atalhos
router.get('/atalhos', (req, res) => {
  res.render('pages/atalhos', {
    pageTitle: 'Atalhos',
    currentPage: 'atalhos',
    pageScript: 'atalhos'
  });
});

module.exports = router;
