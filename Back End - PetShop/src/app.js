//Aqui esta a parte que requer mais, de fato do server
//Aqui carregamos o mongoose, e carregamos as rotas

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

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
mongoose.connect('mongodb+srv://user123:user123@cluster0-jfjoy.mongodb.net/<dbname>?retryWrites=true&w=majority');

/* 
    Declaracao dos models vem aqui, mas tais ainda nao existem
*/
const User = require('./models/user');
const Admin = require('./models/admin');
const Product = require('./models/product');
const Service = require('./models/service');

/*
    Declaracao de rotas vem aqui, mas nao temos ainda
*/
const userindex = require('./routes/userrouter');
const adminindex = require('./routes/adminrouter');
const productindex = require('./routes/productrouter');
const serviceindex = require('./routes/servicerouter');

app.use('/services', serviceindex);
app.use('/products', productindex);
app.use('/admins', adminindex);
app.use('/users', userindex);

module.exports = app;
