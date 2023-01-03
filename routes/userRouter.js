const express = require("express");
const router = express.Router();
const sessions = require('express-session');

const auth = require('../middleware/auth/login/auth')
const addressController = require('../controller/user/address')
const productController=require('../controller/user/productController')
const userController = require('../controller/user/userController')
const shopController = require('../controller/user/shopController')

router.get('/login',userController.userlogin)
router.get('/userSign_up',userController.usersign)
router.post('/userSign_up',userController.userInsert)
router.post('/login',userController.userverificate)
router.get('/',userController.homeLo)
router.post('/otp',userController.user_otp)
router.get('/profile',userController.profile)


/*-------------------------productController---------------------------------*/
router.get('/shop',productController.shoppage)
router.get('/view_product/:id',productController.viewpage)
/*------------------------------cartManagmnt----------------------------------*/
router.get('/cart',auth.userVerfiy,shopController.viewcart)
router.post('/addToCart',shopController.addToCart)
router.post('/change-quantity',shopController.changeQuantity)
router.get('/delete-cart',shopController.deleteCart)

/*----------------------------------adresss---------------------------------*/
router.post('/profile',addressController.insertaddress)
router.get('/checkOut',addressController.showAddress)
router.get('/adddelete',addressController.addDelete)
// router.get('/setdefault',addressController.defaultSet)
module.exports=router