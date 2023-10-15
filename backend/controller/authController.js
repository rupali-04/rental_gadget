const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
//const Company = require('../model/Company');

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

// login
exports.authUser = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});

        }
        const {email,password,location} = req.body;
        let user = await User.findOne({email: email /*email:email*/})
        console.log(user);
        if(!user){
            return res.status(400).json({error:[{msg: "Invalid credentials......"}]});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({msg:"Invalid credentials"})
        }

        user.currentLocation= location;
        await user.save();
        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload,'jwtToken',{expiresIn: 3600000},(err,token)=>{
            if(err){
                throw err
            }else{
                res.json({token})
            }
        });
        

    }catch(err){
        console.log(err.message);
        return res.status(500).json({msg:"Server Error!!"});
    }
};

exports.registerUser = async (req,res)=>{
  try{
//       const errors = validationResult(req);
//   if(!errors.isEmpty()){
//       return res.status(400).json({errors: errors.array()});

//   }
    
  const {username,email,role,location,password} = req.body;
//console.log(req.body);
  let user = await User.findOne({email /*email:email*/});
  if(user){
      return res.status(400).json({error:[{msg: "User already Exsist"}]});
  }
  
  const salt = await bcrypt.genSalt(10);
  const ep = await bcrypt.hash(password,salt);

  user = new User({
      name: username,
      email,
      role,
      currentLocation: location,
      password: ep
  })

 const u = await user.save();
//   if(role.toUpperCase() == "COMPANY"){
//     var company = {
//         companyName: "Company Dem",
//         companyDescription: "This Company is a renter which has many Gadgets to Rent.",
//         userId: user.id,
//         verificationStatus: false,
//         productList: []
//     }
//     company = new Company(company);
    //await company.save();
//}

  const payload = {
      user:{
          id: user.id
      }
  }
  jwt.sign(payload,'jwtToken',{expiresIn: 3600000},(err,token)=>{
      if(err){
          throw err
      }else{
          res.json({token:token,user: u})
      }
  });

  }catch(err){
      console.log(err.message);
      return res.send({error:[{err: err.message}]})
  }
  
};


// update currentlocation

