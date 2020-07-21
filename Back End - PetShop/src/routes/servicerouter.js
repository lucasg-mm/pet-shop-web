
const express = require('express');
const controller = require('../controllers/servicecontroller');
const router = express.Router();

//partes para imagem
const mongoose = require('mongoose');
const multer = require('multer');
const Service = mongoose.model('Service2');
const objID = require('mongodb').ObjectID;

const storage = multer.diskStorage({

    destination: function(req,file,cb){
        cb(null,'./uploads/');

    },
    filename: function(req,file,cb){
        //desse jeito arquivos com o mesmo nome ainda podem
        //ser passados para pessoas diferentes
        cb(null, Date.now() + file.originalname);
    }

})

const upload = multer({storage: storage});
//infelizmente a rota de inserir imagem tera de ser feita aqui.

router.post('/', controller.post);
router.get('/', controller.get);
router.get('/:name', controller.getbyname);
router.get('/id/:id', controller.getbyId);
router.put('/update/:id', controller.update);
router.put('/appoint', controller.appoint);
router.put('/disasociate', controller.disasociate);
router.put('/free', controller.free);
router.delete('/:id',controller.delete);

//vamos agora tentar implementar carregar imagens
//Imagens para upload devem vir no formato FORM, especificando que sao
//do tipo FILE
router.post('/image/:id',upload.single('Image'), (req,res,next) =>{
        
    const uid = new objID(req.params.id);
    
    Service.findByIdAndUpdate(uid,{
        $set:{
            ServiceImage: req.file.path
        }
    }, function(err, result){
        if(err){
            console.log("Error" + err);
            res.status(400).send({result: "FAIL"});
        }
        else{
            res.status(202).send({result: "SUCCESS"});
            console.log("Sucess" + result);
        }
    })
});

module.exports = router;