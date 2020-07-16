
const express = require('express');
const controller = require('../controllers/admincontroller');
const router = express.Router();

//infelizmente a rota de inserir imagem tera de ser feita aqui.

router.post('/', controller.post);
router.get('/', controller.get);
router.get('/:username', controller.getbyname);
router.get('/id/:id', controller.getbyId);
router.put('/update/:id', controller.update);

module.exports = router;