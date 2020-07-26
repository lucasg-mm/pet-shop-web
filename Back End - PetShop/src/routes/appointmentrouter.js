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
