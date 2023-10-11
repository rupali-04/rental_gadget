const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    available:{
        type: String,
        required: true
    },
    gadgetType:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    gadgetModel:{
        type: String,
        required: true
    },
    specification:{
        type: String,
        required: true
    },
    serialNumber:{
        type: String,
        required: true
    },
    securityDeposit:{
        type: Number,
        required: true
    },
    rentalRate:{
        type: Number,
        required: true
    },
    gadgetLocation: {
        type: String,
        required: true
    },
    companyDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Product = mongoose.model('product',ProductSchema);