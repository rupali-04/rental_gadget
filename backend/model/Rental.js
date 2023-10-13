import mongoose from 'mongoose'

const rentalSchema = mongoose.Schema(
  {
    renteeUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fromBookingDate:{
        type: String,
        required: true
    },
    toBookingDate:{
        type: String,
        required: true
    },
    coupounApply: {
        type: String,
        required: true
    },
    orderTransferDetails:{
        Address: String,
        shippingType: String,
        shippingCharge: Number
    },
    totalPaymsent:{
        type: Number,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    }
  }
 
)

const Rental = mongoose.model('Rental', rentalSchema)

export default Rental