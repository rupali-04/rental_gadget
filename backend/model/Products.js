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
    photoGalary:{
        type: String
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
    discountCoupon: {
        validationDate: String,
        couponCode: String,
        amount: Number
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Product = mongoose.model('product',ProductSchema);