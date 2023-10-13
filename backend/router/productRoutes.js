const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check,validationResult} = require('express-validator');

const productController = require("../controller/productController");


//@route    GET api/product/
//@desc     This route help us to get product on based of location 
//@access   Private
router.get("/",auth,productController.viewProductDetail);


//@route    POST api/product/add
//@desc     This route help us to get Insert Product in the system by user with role Company 
//@access   Private
router.post("/add",auth,productController.addProduct);

//@route    Put api/product/update/:id
//@desc     This route help us to get Update Product in the system by product id 
//@access   Private
router.put("/update/:id",auth,productController.updateProduct);

//@route Delete api/product/delete/:id
//@desc     This route help us to get Product Obsolete or Delete (You can pause the product or delete it completely) in the system by product id 
//@access   Private
router.delete("/delete/:id",auth,productController.deleteProduct);


