//Aqui vem os controlardores 

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const objID = require('mongodb').ObjectID;

exports.get = (req,res,next) =>{
    
    Product.find().then(data =>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send(e);
    });

    console.log('Get request');
};

//versao basica, sem imagem, usada quando criamos o produto
exports.post = (req,res,next) =>{
    var newuser = new Product({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description
    });

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

    Product.find({name: req.params.name}, function(err, doc){
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
    
    Product.findById(uid, function(err,doc){
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
    
    Product.findByIdAndUpdate(uid, {
        $set:{
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
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