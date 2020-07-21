//Aqui vem os controlardores 

const mongoose = require('mongoose');
const PET = mongoose.model('Pet');
const objID = require('mongodb').ObjectID;

exports.get = (req,res,next) =>{
    
    PET.find().then(data =>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send(e);
    });

    console.log('Get request');
};

exports.delete = (req,res,next) =>{

    const uid = new objID(req.params.id);
    PET.findByIdAndDelete(uid, function(err,doc){
        if(err){
            res.status(400).send({result:"FAILURE"});
        }
        else{
            
            res.status(200).send({result:"SUCCESS"})
        }
    })


}

//versao basica, sem imagem, usada quando criamos o usuario
exports.post = (req,res,next) =>{
    var newuser = new PET({
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        ownerId: req.body.ownerId
    });

    newuser.save()
    .then(x =>{
        res.status(201).send(x);  // envia o objeto que acabou de ser registrado na coleção
    })
    .catch(e=>{
        res.status(400).send(e);
    });

}

//acha um usuario por nome (usado em login e criacao de usuario)
exports.getbyname = (req,res, next) =>{

    PET.find({name: req.params.name}, function(err, doc){
        //se nao achamos
        if(err){
            res.status(400).send({name: "NOTFOUND",
                                  error: err});
        }
        else if(doc.length == 0){
            res.status(200).send({name: "NOTFOUND",
                                  docu: doc});
        }
        else{
            res.status(200).send(doc[0]);
        }
    });
}

exports.getbyId = (req,res,next) =>{
    const uid = new objID(req.params.id);
    
    PET.findById(uid, function(err,doc){
        if(err){
            res.status(400).send({name: "NOTFOUND"});
            console.log('Error');
        }
        else if(doc.length == 0){
            res.status(200).send({name: "NOTFOUND"});
            console.log('Error - Not Found');
        }
        else{
            res.status(200).send(doc);
            console.log('Success');
        }
    });
}

exports.update = (req,res,next) => {
    const uid = new objID(req.params.id);
    
    PET.findByIdAndUpdate(uid, {
        $set:{
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            age: req.body.age,
            ownerId: req.body.ownerId
        }}, function (err,result){
            if(err){
                console.log("Error" + err);
                res.status(400).send({result: "FAIL"});
            }
            else{
                res.status(202).send({result: "SUCCESS"});
                console.log("Sucess" + result);
            }
        });
}

exports.getbyOwnerId = (req,res,next) =>{
    PET.find({ownerId: req.params.id}, function(err, doc){
        if(err){
            res.status(400).send({name: "NOTFOUND"});
        }
        else if(doc.length == 0){
            res.status(200).send({name: "NOTFOUND"});
        }
        else{
            res.status(200).send(doc);
        }
    });
}

exports.addReserve = (req,res,next) =>{

    //pelo id do animal
    //escolhemos o animal durante o processo de 
    //agendar um servico
    const uid = new objID(req.body.id);

    PET.findById(uid, function(err,doc){
        if(err){
            res.status(400).send({result: "FAILURE",
                                  error: err});
        }
        else if(!doc){
            res.status(401).send({result: "FAILURE",
                                  docu: doc});
        }
        else{
            doc.services.push({
                serviceId: req.body.serviceId,
                day: req.body.day,
                hour: req.body.hour,
                name: req.body.name
            });

            doc.save();

            res.status(200).send({result: "SUCCESS"});
        }
    });
}