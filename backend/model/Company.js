const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    
    companyName: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    verificationStatus: {
        type: Boolean
    },
    productList: {
        type: [mongoose.Schema.Types.ObjectId]

    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Company = mongoose.model('company',CompanySchema);