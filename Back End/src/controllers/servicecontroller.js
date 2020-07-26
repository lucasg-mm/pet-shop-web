// Lucas Xavier Ebling Pereira - 10692183 
// Lucas Gabriel Mendes Miranda - 10265892
// Luís Fernando Martins Rodrigues de Araújo - 11275189 

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

// usada quando criamos o servico
exports.post = (req,res,next) =>{
    var newuser = new Service({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    });
    
    newuser.save()
    .then(x =>{
        res.status(201).send(x);
    })
    .catch(e=>{
        res.status(400).send(e);
    });

}

//acha um serviço por nome
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

exports.delete = (req,res,next) =>{

    const uid = new objID(req.params.id);
    Service.findByIdAndDelete(uid, function(err,doc){
        if(err){
            res.status(400).send({result:"FAILURE"});
        }
        else{
            
            res.status(200).send({result:"SUCCESS"})
        }
    })


}

exports.sell = (req,res,next) =>{
    
    const uid = new objID(req.params.id);

    Service.findById(uid, function(err,doc){
        if(err){
            res.status(400).send({result:"FAILURE"});
        }
        else if(!doc){
            res.status(400).send({result:"FAILURE"});
        }
        else{
                doc.bought = doc.bought + 1;
                doc.save();
                res.status(200).send({result: "SUCCESS"});
        }
    })

}