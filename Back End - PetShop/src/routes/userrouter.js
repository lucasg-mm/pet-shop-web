
const express = require('express');
const controller = require('../controllers/usercontroller');
const router = express.Router();

//partes para imagem
const mongoose = require('mongoose');
const multer = require('multer');
const User = mongoose.model('User');
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
router.get('/:username', controller.getbyname);
router.get('/id/:id', controller.getbyId);
router.put('/update/:id', controller.update);
router.delete('/:id',controller.delete);

//vamos agora tentar implementar carregar imagens
//Imagens para upload devem vir no formato FORM, especificando que sao
//do tipo FILE
router.post('/image/:id',upload.single('Image'), (req,res,next) =>{
        
    const uid = new objID(req.params.id);
    
    User.findByIdAndUpdate(uid,{
        $set:{
            profileImage: req.file.path
        }
    }, function(err, result){
        if(err){
            console.log("Error" + err);
            res.status(400).send({result: "FAIL"});
        }
        else{
            res.status(202).send({profileImage: req.file.path});
            console.log("Sucess" + result);
        }
    })
});

module.exports = router;