// Lucas Xavier Ebling Pereira - 10692183 
// Lucas Gabriel Mendes Miranda - 10265892
// Luís Fernando Martins Rodrigues de Araújo - 11275189 

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

    productImage: {
        type: String,
        required: true,
        default: "uploads/Default.png"
    },

    bought: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Product2',theschema);