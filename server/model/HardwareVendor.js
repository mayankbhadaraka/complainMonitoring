const mongoose = require('mongoose');

const HardwareSchema = new mongoose.Schema({
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
    HardwareVendor: {
        type: String,
        required: true
    },
    ReferanceNumber: {
        type: String,
        required: true
    }
});

const HardwareVendor=mongoose.model('HardwareVendor',HardwareSchema);
module.exports=HardwareVendor;