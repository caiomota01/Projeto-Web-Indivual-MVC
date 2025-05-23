const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController');

router.post('/', CategoriaController.criarCategoria);
router.get('/', CategoriaController.listarCategorias);
router.put('/:id', CategoriaController.editarCategoria);
router.delete('/:id', CategoriaController.excluirCategoria);

module.exports = router; 