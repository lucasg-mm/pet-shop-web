//modelo para usuario

const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const theschema = new mySchema({

    name:{
        type: String,
        required: [true,'username required'],
        trim: true
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

    //o nosso servico tera uma array de 168 membros para simular a array
    timeTable:[{
        status:{
            type: Number,
            required: true,
            default: 0
        },

        //colocamos tambem o nome de um pet
        petid: {
            type: String,
            trim: true
        }
    }],

    //Imagem de perfil sera implementada em breve
    ServiceImage: {
        type: String,
        required: true,
        default: "No Image"
    }
});

module.exports = mongoose.model('Service2',theschema);