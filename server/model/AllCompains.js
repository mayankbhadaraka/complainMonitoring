const mongoose = require('mongoose');

const AllComplainSchema = new mongoose.Schema({
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
    Status: {
        type: String,
        required: true
    },
    ReferanceNumber: {
        type: String,
        required: true
    }
});

const AllComplain=mongoose.model('AllComplain',AllComplainSchema);
module.exports=AllComplain;