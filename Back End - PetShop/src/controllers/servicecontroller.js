//Aqui vem os controlardores 

const mongoose = require('mongoose');
const Service = mongoose.model('Service2');
const objID = require('mongodb').ObjectID;

exports.get = (req,res,next) =>{
    
    Service.find().then(data =>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send(e);
    });

    console.log('Get request');
};

//versao basica, sem imagem, usada quando criamos o servico
exports.post = (req,res,next) =>{
    var newuser = new Service({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        timeTable: []
    });

    var i;

    for(i = 0; i < 168; i++){
        newuser.timeTable.set(i,{
            status: 0,
            petid: ""
        });
    }
    
    newuser.save()
    .then(x =>{
        res.status(201).send({msg: "User Created"});
    })
    .catch(e=>{
        res.status(400).send(e);
    });

}

//acha um usuario por nome (usado em login e criacao de usuario)
exports.getbyname = (req,res, next) =>{

    Service.find({name: req.params.name}, function(err, doc){
        //se nao achamos
        if(err){
            res.status(400).send({name: "NOTFOUND"});
        }
        else if(doc.length == 0){
            res.status(200).send({name: "NOTFOUND"});
        }
        else{
            res.status(200).send(doc[0]);
        }
    });
}

exports.getbyId = (req,res,next) =>{
    const uid = new objID(req.params.id);
    
    Service.findById(uid, function(err,doc){
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
    
    Service.findByIdAndUpdate(uid, {
        $set:{
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
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

//para marcar, e preciso um id de animal e uma data (garantir a existencia do animal
//eh responsabilidade das gets do servico animal). A data eh feita da seguinte forma:
// Dias = "colunas" = j  esses valores irao de 1 a 7 - segunda a domingo
// Horas = "linhas" = i  esses valores irao de 0 a 23 - da meia noite as 23hrs
// eh preciso, tambem, mandar o id do servico
exports.appoint = (req, res, next) => {
    const iud = new objID(req.body.id);
    const placement = ((req.body.j - 1)* 24) + req.body.i;
    try {
        
    Service.findById(iud, function(err, doc) {
        if(err){
            res.status(401).send({result: "FAILURE2"});
        }
        else if(!doc){
            res.status(400).send({result: "FAILURE"});
        }
        else{
            doc.timeTable[placement].status = 2;
            doc.timeTable[placement].petid = req.body.petid;
            doc.save();
            res.status(200).send({result: "SUCCESS"});
        }
    });
    
    
    } catch (error) {
        console.log(error);
    }
}

exports.free = (req, res, next) => {
    const iud = new objID(req.body.id);
    const placement = ((req.body.j - 1)* 24) + req.body.i;
    try {
        
    Service.findById(iud, function(err, doc) {
        if(err){
            res.status(401).send({result: "FAILURE2"});
        }
        else if(!doc){
            res.status(400).send({result: "FAILURE"});
        }
        else{
            doc.timeTable[placement].status = 1;
            doc.timeTable[placement].petid = "";
            doc.save();
            res.status(200).send({result: "SUCCESS"});
        }
    });
    
    } catch (error) {
        console.log(error);
    }
}

exports.disasociate = (req, res, next) => {
    const iud = new objID(req.body.id);
    const placement = ((req.body.j - 1)* 24) + req.body.i;
    try {
        
    Service.findById(iud, function(err, doc) {
        if(err){
            res.status(401).send({result: "FAILURE2"});
        }
        else if(!doc){
            res.status(400).send({result: "FAILURE"});
        }
        else{
            doc.timeTable[placement].status = 0;
            doc.timeTable[placement].petid = "";
            doc.save();
            res.status(200).send({result: "SUCCESS"});
        }
    });
    
    } catch (error) {
        console.log(error);
    }
}