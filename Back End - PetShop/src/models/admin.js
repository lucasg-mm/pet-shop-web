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

    realName: {
        type: String,
        required: [true,'real name required'],
        trim: true
    },
    //Imagem de perfil sera implementada em breve
    profileImage: {
        type: String,
        required: true,
        default: "No Image"
    }
});

module.exports = mongoose.model('Admin',theschema);