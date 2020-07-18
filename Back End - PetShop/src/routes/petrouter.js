
const express = require('express');
const controller = require('../controllers/petcontroller');
const router = express.Router();

//infelizmente a rota de inserir imagem tera de ser feita aqui.

router.post('/', controller.post);
router.get('/', controller.get);
router.get('/:name', controller.getbyname);
router.get('/id/:id', controller.getbyId);
router.put('/update/:id', controller.update);
router.get('/owner/:id', controller.getbyOwnerId);
router.put('/reserve', controller.addReserve);

module.exports = router;