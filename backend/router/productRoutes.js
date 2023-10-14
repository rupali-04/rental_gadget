const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check,validationResult} = require('express-validator');

const productController = require("../controller/productController");


//@route    GET api/product/
//@desc     This route help us to get product on based of location 
//@access   Private
router.get("/",auth,productController.viewProducts);

//@route    GET api/product/view/all
//@desc     This route help us to get product. 
//@access   Private
router.get("/view/all",auth,productController.viewDashboardProduct);


//@route    POST api/product/add
//@desc     This route help us to get Insert Product in the system by user with role Company 
//@access   Private
router.post("/add",auth,productController.addProduct);




//@route    POST api/product/coupon
//@desc     This route help us to create Coupon for users
//@access   Private
router.post("/coupon",auth,productController.addCoupon);


//@route    PUT api/product/add/coupon/:id
//@desc     This route help us to add Coupoun in Product
//@access   Private
router.put("/add/coupon/:id",auth,productController.addCouponInProduct);



//@route    PUT api/product/add/coupons
//@desc     This route help us to add Coupoun in all Product
//@access   Private
router.put("/add/coupons/",auth,productController.addCouponAllProduct);



//@route    Put api/product/update/:id
//@desc     This route help us to get Update Product in the system by product id 
//@access   Private
//router.put("/update/:id",auth,productController.updateProduct);

//@route Delete api/product/delete/:id
//@desc     This route help us to get Product Obsolete or Delete (You can pause the product or delete it completely) in the system by product id 
//@access   Private
//router.delete("/delete/:id",auth,productController.deleteProduct);


module.exports = router;