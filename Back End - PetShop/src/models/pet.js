//modelo para usuario

const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const theschema = new mySchema({

    name:{
        type: String,
        required: [true,'name required'],
        trim: true
    },

    species:{
        type: String,
        trim: true
    },

    breed: {
        type: String,
        trim: true
    },

    ownerId: {
        type: String,
        required: [true,'owner required'],
        trim: true
    },

    age: {
        type: Number
    },

    services:[{
        serviceId:{
            type: String,
            trim: true
        },
        day:{
            type: Number,
        },

        hour:{
            type: Number,
        },
        
        name:{
            type: String,
            trim: true
        }
    }],

    //Imagem de perfil sera implementada em breve
    petImage: {
        type: String,
        required: true,
        default: "http://localhost:3000/uploads/Default.png"
    }
});

module.exports = mongoose.model('Pet',theschema);