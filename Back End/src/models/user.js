// Lucas Xavier Ebling Pereira - 10692183 
// Lucas Gabriel Mendes Miranda - 10265892
// Luís Fernando Martins Rodrigues de Araújo - 11275189 

//modelo para usuario

const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const theschema = new mySchema({

    username:{
        type: String,
        required: [true,'username required'],
        trim: true
    },

    phonenumber:{
        type: String,
        trim: true
    },

    address: {
        type: String,
        trim: true
    },

    email:{
        type:String,
        trim: true
    },

    password: {
        type: String,
        required: [true,'password required'],
        trim: true
    },

    pets:[{
        type: String,
    }],

    profileImage: {
        type: String,
        required: true,
        default: "uploads/Default.png"
    }
});

module.exports = mongoose.model('User',theschema);