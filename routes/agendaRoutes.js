const express = require('express');
const router = express.Router();
const AgendaController = require('../controllers/AgendaController');

router.post('/', AgendaController.criarAgenda);
router.get('/', AgendaController.listarAgendas);
router.put('/:id', AgendaController.editarAgenda);
router.delete('/:id', AgendaController.excluirAgenda);

module.exports = router; 