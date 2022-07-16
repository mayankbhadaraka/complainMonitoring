const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
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
    serviceManager: {
        type: String,
        required: true
    },
    ReferanceNumber: {
        type: String,
        required: true
    }
});

const Manager=mongoose.model('MANAGER',ManagerSchema);
module.exports=Manager;