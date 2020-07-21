//Aqui vem os controlardores 

const mongoose = require('mongoose');
const User = mongoose.model('User');
const objID = require('mongodb').ObjectID;

exports.get = (req,res,next) =>{
    
    User.find().then(data =>{
        res.status(200).send(data);
    }).catch(e=>{
        res.status(400).send(e);
    });

    console.log('Get request');
};

//versao basica, sem imagem, usada quando criamos o usuario
exports.post = (req,res,next) =>{
    var newuser = new User({
        username: req.body.username,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        email: req.body.email
    });

    newuser.save()
    .then(x =>{
        res.status(201).send({msg : "User Created"});
    })
    .catch(e=>{
        res.status(400).send(e);
    });

}

//acha um usuario por nome (usado em login e criacao de usuario)
exports.getbyname = (req,res, next) =>{

    User.find({username: req.params.username}, function(err, doc){
        //se nao achamos
        if(err){
            res.status(400).send({username: "NOTFOUND"});
        }
        else if(doc.length == 0){
            res.status(200).send({username: "NOTFOUND"});
        }
        else{
            res.status(200).send(doc[0]);
        }
    });
}

exports.delete = (req,res,next) =>{

    const uid = new objID(req.params.id);
    User.findByIdAndDelete(uid, function(err,doc){
        if(err){
            res.status(400).send({result:"FAILURE"});
        }
        else{
            
            res.status(200).send({result:"SUCCESS"})
        }
    })


}

exports.getbyId = (req,res,next) =>{
    const uid = new objID(req.params.id);
    
    User.findById(uid, function(err,doc){
        if(err){
            res.status(400).send({username: "NOTFOUND"});
            console.log('Error');
        }
        else if(doc.length == 0){
            res.status(200).send({username: "NOTFOUND"});
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
    
    User.findByIdAndUpdate(uid, {
        $set:{
            username: req.body.username,
            password: req.body.password,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            email: req.body.email
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