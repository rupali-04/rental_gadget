const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const Company = require('../model/Company');

exports.addProduct = async (req,res)=>{
    try{
    
        const newProduct = new Products({
            title: req.body.title,
            description: req.user.description,
            age: req.body.age,
            gender: req.body.gender,
            occupation: req.body.occupation 
        });
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}

const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const Company = require('../model/Company');
const Products = require('../model/Products');

exports.userDetails = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
       // console.log(user);
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}
