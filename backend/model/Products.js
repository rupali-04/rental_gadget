const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    available:{
        type: Boolean,
        required: true
    },
    photoGallary: {
        type: Array,
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
        type: String
    },
    serialNumber:{
        type: String,
        required: true
    },
    toAvailableDate:{
        type: Date,
        required: true
    },
    fromAvailableDate:{
        type: Date,
        default: Date.now
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
    userDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    discountCode:[{
        type: mongoose.Schema.Types.ObjectId
    }],
    isObssolete:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Product = mongoose.model('product',ProductSchema);