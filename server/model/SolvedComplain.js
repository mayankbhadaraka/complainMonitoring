const mongoose = require('mongoose');

const SolvedComplain= new mongoose.Schema({
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
    responce: {
        type: String,
        required: true
    },
    ReferanceNumber: {
        type: String,
        required: true
    }
});

const Solved =mongoose.model('Solved',SolvedComplain);
module.exports=Solved;