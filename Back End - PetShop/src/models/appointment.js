//modelo para appointments

const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const theschema = new mySchema({
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
        },

        ownerid:{
            type: String,
            trim: true
        },

        serviceid:{
            type: String,
            trim: true
        },

        imageurl:{
            type: String,
            trim:true,
            default: "uploads/Default.png"
        }
    }]
});

module.exports = mongoose.model('Appointment',theschema);