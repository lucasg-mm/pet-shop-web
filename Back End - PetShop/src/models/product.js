//modelo para usuario

const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const theschema = new mySchema({

    name:{
        type: String,
        required: [true,'username required'],
        trim: true
    },

    stock:{
        type: Number,
        required:true,
        default: 0
    },

    price:{
        type: Number,
        required:true,
        default: 0
    },

    description:{
        type:String,
        trim: true
    },

    //Imagem de perfil sera implementada em breve
    productImage: {
        type: String,
        required: true,
        default: "http://localhost:3000/uploads/Default.png"
    }
});

module.exports = mongoose.model('Product',theschema);