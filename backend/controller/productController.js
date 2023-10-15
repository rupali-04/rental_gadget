
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const Products = require('../model/Products');
const Coupon = require('../model/Coupon');
const mongoose = require('mongoose');

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
            gadgetLocation,
            // toAvailableDate,
            // fromAvailableDate,
            securityDeposit,
            rentalRate,
          //  discountCoupon
         } = req.body;
         const currentDate = new Date();
         const nextMonth = new Date(currentDate);

         // Add one to the current month
        
const toDate =  nextMonth.setMonth(currentDate.getMonth() + 1);
        const product = new Products({
            title,
            description,
            available: true,
            gadgetType,
            brand,
            gadgetModel,
            specification,
            serialNumber,
            toAvailableDate: toDate, // Add one to the current month
            securityDeposit,
            rentalRate,
            gadgetLocation,
            userDetails: user._id,
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
        const user = await User.findById(req.user.id).select("-password");
        const product = await Products.find({gadgetLocation: user.address.city , isObssolete: false});
        res.json(product);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}

exports.viewDashboardProduct = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        const product = await Products.find({userDetails: user._id});
        res.json(product);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}

exports.addCoupon = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        
        const {couponCode,discountPrice,validationDate} = req.body;
        const coupon = new Coupon({
            couponCode,
            validationDate,
            discountPrice,
            userId: user._id,
        });
        await coupon.save();
        res.json(coupon);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}

exports.addCouponInProduct = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
       // const coupon = await Coupon.findById(req.body.coupounId);
      
       const product = await Products.findById(req.params.id);
       if(product.discountCode.includes(new mongoose.Types.ObjectId(req.body.couponId))){
           

        return res.status(400).send('Coupon is Already there');
       } 
       if(product.isObssolete){
            return res.status(400).send('Product is InActive');
       }
        product.discountCode.push(req.body.couponId);
        await product.save();
        res.json(product);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}

exports.addCouponAllProduct = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        const coupon = await Coupon.findById(req.body.coupounId);
       const product = await Products.find({userDetails: user._id});
       for(var i=0;i<product.length;i++){
       // console.log(product[i].discountCode.includes(new mongoose.Types.ObjectId(req.body.couponId)));
        if(product[i].discountCode.includes(new mongoose.Types.ObjectId(req.body.couponId)) ){
           

            console.log('Coupon is Already there');
           } else if(product.isObssolete){
            console.log("Product is Inactive");
           }
         else{
           // console.log("Ee");
            product[i].discountCode.unshift(req.body.couponId);
            await product[i].save();
       
         } 
         }
        res.json(product);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}


exports.addPickUp = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
       // const coupon = await Coupon.findById(req.body.coupounId);
       user.address.city = req.body.city;
       user.address.country = req.body.country;
       user.address.place = req.body.place;
       user.address.pincode = req.body.pincode; 
       await user.save();
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}

exports.pauseProduct = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
       // const coupon = await Coupon.findById(req.body.coupounId);
        const product = await Products.findById(req.params.id);
        product.isObssolete = true;
       await product.save();
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}

exports.uploadPhotos = async(req,res)=>{
    const product = await Products.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");
    if (!product) {
      return res.status(400).send("Product not found....");
    }
  
    if (product.user.toString() !== req.user.id) {
        return res.status(400).send("User not Allowed to change in Product....");
    }
   
    if (!req.files) {
      return res.status(400).send("Please Upload a Photo");
    
    }
  
  
  
    const file = req.files.file;
  
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).send("Please Upload a Image Type file");
    }
  
  //   // Check filesize
  //   if (file.size > 400) {
  //     return next(
  //       new ErrorResponse(
  //         `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
  //         400
  //       )
  //     );
  //   }
  
  
    file.mv(`./public/uploads/${user.name}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(400).send("There is some issue in File Upload.....");
      }
  
        product.photoGallary.unshift(file.name);
        await product.save();
      res.status(200).json({
        success: true,
        data: file.name
      });
    });
  };

