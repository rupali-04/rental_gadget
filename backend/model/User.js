const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    address: {
        place: String,
        city: String,
        country: String,
        pincode: {
            type: Number,
            min: 6
        }
    },
    verificationStatus: {
        type: String,
       
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user',UserSchema);