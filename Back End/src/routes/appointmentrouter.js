// Lucas Xavier Ebling Pereira - 10692183 
// Lucas Gabriel Mendes Miranda - 10265892
// Luís Fernando Martins Rodrigues de Araújo - 11275189 

const express = require('express');
const controller = require('../controllers/appointmentcontroller');
const router = express.Router();

router.get('/',controller.get);
router.post('/', controller.makenew);
router.post('/appoint', controller.appoint);
router.post('/free',controller.free);
router.post('/disassociate', controller.disassociate);
router.get('/free/:id', controller.freebyID);
router.delete('/',controller.delete);

module.exports = router;
