// Lucas Xavier Ebling Pereira - 10692183 
// Lucas Gabriel Mendes Miranda - 10265892
// Luís Fernando Martins Rodrigues de Araújo - 11275189 


//Aqui esta a parte que requer mais, de fato do server
//Aqui carregamos o mongoose, e carregamos as rotas

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//adicao para imagem
app.use('/uploads',express.static('uploads'))
//adicao para imagem
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','*');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
    next();
});

const router = express.Router();
mongoose.connect('mongodb://localhost/');

/* 
    Declaracao dos models aqui
*/
const User = require('./models/user');
const Admin = require('./models/admin');
const Product = require('./models/product');
const Service = require('./models/service');
const PET = require('./models/pet');
const Appointment = require('./models/appointment');

/*
    Declaracao de rotas aqui
*/
const userindex = require('./routes/userrouter');
const adminindex = require('./routes/adminrouter');
const productindex = require('./routes/productrouter');
const serviceindex = require('./routes/servicerouter');
const petindex = require('./routes/petrouter');
const appointmentindex = require('./routes/appointmentrouter');

app.use('/appointments',appointmentindex);
app.use('/services', serviceindex);
app.use('/products', productindex);
app.use('/admins', adminindex);
app.use('/users', userindex);
app.use('/pets',petindex);

module.exports = app;
