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
        enum: ['rentee', 'renter'],
        required: true
    },
    address: {
        place: String,
        city: String,
        country: String,
        state: String,
        pincode: {
            type: Number,
            min: 6
        }
    },
    currentLocation: {
        type: String,
        require: true
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