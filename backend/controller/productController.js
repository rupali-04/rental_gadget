
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const Products = require('../model/Products');

exports.addProduct = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        
        const {
            title,
            description,
            gadgetType,
            brand,
            gadgetModel,
            specification,
            serialNumber,
            // toAvailableDate,
            // fromAvailableDate,
            securityDeposit,
            rentalRate,
          //  discountCoupon
         } = req.body;

        const product = new Products({
            title,
            description,
            available: true,
            gadgetType,
            brand,
            gadgetModel,
            specification,
            serialNumber,
            toAvailableDate,
            fromAvailableDate,
            securityDeposit,
            rentalRate,
            gadgetLocation: user.address.city,
            userDetails: user._id,
            discountCoupon
        });
        
        await product.save();
        
       // console.log(user);
        res.json(product);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}

exports.viewProducts = async (req,res) => {
    try{
        
    }catch(err){

    }
}
