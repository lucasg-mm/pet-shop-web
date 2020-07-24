//Aqui vem os controladores 

const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
const objID = require('mongodb').ObjectID;

//pega o "primeiro" (unico) dos appointments 
exports.get = (req,res,next) =>{
    Appointment.find(function(err,doc){
        if(err){
            console.log("Error" + err);
            res.status(400).send({result: "FAIL"});
        }
        else if(doc.length == 0){
            
            res.status(400).send({result: "FAIL", type:"NOAPP"});
        }

        else{
            res.status(200).send(doc[0]);
        }
    })
}

//cria um novo
exports.makenew = (req,res,next) =>{
    var newapp = new Appointment({timeTable: []});

    var i;

    //10 horarios em 10 semanas de 7 dias
    for(i = 0; i < 700; i++){
        newapp.timeTable.set(i,{
            status: 0,
            petid: "",
            ownerid: "",
            serviceid: "",
            imageurl: "uploads/Default.png"
        });
    }

    newapp.save()
    .then(x =>{
        res.status(201).send({msg: "User Created"});
    })
    .catch(e=>{
        res.status(400).send(e);
    });
}


//fornecemos os ids, o url da imagem do servico
//fornecemos tambem o dia e hora
//dias de 1 a 70
//horas de 1 a 10
//formula: (dia - 1) * 10 + (hora -1)
//ex: dia 3 hora 7 --> (3-1)* 10 + 7-1 = 26  
exports.appoint = (req,res,next) =>{
    var time = ((req.body.day - 1)* 10) + (req.body.hour - 1);
    console.log(time);


    Appointment.find(function(err,doc){
        if(err){
            console.log("Error" + err);
            res.status(400).send({result: "FAIL"});
        }
        else if(doc.length == 0){
            
            res.status(400).send({result: "FAIL"},{
                type:"NOAPP"
            });
        }

        else{
            doc[0].timeTable[time].imageurl = req.body.imageurl;
            doc[0].timeTable[time].petid = req.body.petid;
            doc[0].timeTable[time].serviceid = req.body.serviceid;
            doc[0].timeTable[time].ownerid = req.body.ownerid;
            doc[0].timeTable[time].status = 2;

            doc[0].save();
            res.status(200).send({result: "SUCCESS"});

        }
    })
}


exports.free = (req,res,next) =>{
    var time = ((req.body.day - 1)* 10) + (req.body.hour - 1);
    console.log(time);


    Appointment.find(function(err,doc){
        if(err){
            console.log("Error" + err);
            res.status(400).send({result: "FAIL"});
        }
        else if(doc.length == 0){
            
            res.status(400).send({result: "FAIL"},{
                type:"NOAPP"
            });
        }

        else{
            doc[0].timeTable[time].imageurl = "uploads/Default.png";
            doc[0].timeTable[time].petid = "";
            doc[0].timeTable[time].serviceid = "";
            doc[0].timeTable[time].ownerid = "";
            doc[0].timeTable[time].status = 1;

            doc[0].save();
            res.status(200).send({result: "SUCCESS"});

        }
    })
}

exports.disassociate = (req,res,next) =>{
    var time = ((req.body.day - 1)* 10) + (req.body.hour - 1);
    console.log(time);


    Appointment.find(function(err,doc){
        if(err){
            console.log("Error" + err);
            res.status(400).send({result: "FAIL"});
        }
        else if(doc.length == 0){
            
            res.status(400).send({result: "FAIL"},{
                type:"NOAPP"
            });
        }

        else{
            doc[0].timeTable[time].imageurl = "uploads/Default.png";
            doc[0].timeTable[time].petid = "";
            doc[0].timeTable[time].serviceid = "";
            doc[0].timeTable[time].ownerid = "";
            doc[0].timeTable[time].status = 0;

            doc[0].save();
            res.status(200).send({result: "SUCCESS"});

        }
    })
}



