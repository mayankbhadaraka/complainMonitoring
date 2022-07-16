const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    device:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    ReferanceNumber: {
        type: String,
        required: true
    }
});

const Complain=mongoose.model('COMPLAIN',complainSchema);
module.exports=Complain;