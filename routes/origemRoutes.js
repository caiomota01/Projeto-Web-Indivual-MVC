const express = require('express');
const router = express.Router();
const OrigemController = require('../controllers/OrigemController');

router.post('/', OrigemController.criarOrigem);
router.get('/', OrigemController.listarOrigens);
router.put('/:id', OrigemController.editarOrigem);
router.delete('/:id', OrigemController.excluirOrigem);

module.exports = router; 