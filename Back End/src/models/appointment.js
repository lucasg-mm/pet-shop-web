// Lucas Xavier Ebling Pereira - 10692183 
// Lucas Gabriel Mendes Miranda - 10265892
// Luís Fernando Martins Rodrigues de Araújo - 11275189 

//modelo para appointments

const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const theschema = new mySchema({
    //o nosso servico tera uma array de 700 membros para simular a array (7 dias, 10 semanas, 10 slots por dia)
    timeTable:[{
        status:{
            type: Number,
            required: true,
            default: 0  // 0 - livre, 1 - ocupado 
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
        },

        servicename:{
            type: String,
            trim: true
        },

        ownername:{
            type: String,
            trim: true
        },

        petname:{
            type: String,
            trim: true
        }
    }]
});

module.exports = mongoose.model('Appointment',theschema);