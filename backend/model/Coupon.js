const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    couponCode:{
        type: String,
        required: true,
    },
    discountPrice:{
        type: Number,
        required: true,
    },
    validationDate: {
        type: Date,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }, 
    isObssolete:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Coupon = mongoose.model('coupon',CouponSchema);