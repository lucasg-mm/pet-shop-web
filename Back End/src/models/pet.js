// Lucas Xavier Ebling Pereira - 10692183 
// Lucas Gabriel Mendes Miranda - 10265892
// Luís Fernando Martins Rodrigues de Araújo - 11275189 

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

    petImage: {
        type: String,
        required: true,
        default: "uploads/Default.png"
    }
});

module.exports = mongoose.model('Pet',theschema);