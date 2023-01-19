const express = require("express");
const router = express.Router();
const sessions = require('express-session');
const upload = require('../middleware/multer')
const upldPic = require('../middleware/singleMulter')
//{{controller}}
const auth = require('../middleware/auth/admin/auth')
const orderController = require('../controller/admin/order')
const couponController = require('../controller/admin/coupon')
const admincontroller = require('../controller/admin/adminController')
const productController = require('../controller/admin/productController')
const categoryController = require('../controller/admin/categoryController')
const custmoerController = require('../controller/admin/customer.Controller')
const bannerController = require('../controller/admin/banner')
const exportPDF = require('../controller/admin/excellExport')

//{{Router}}
router.get('/',auth.sessionCheck,admincontroller.dashboard)
router.get('/login',admincontroller.login)
router.post('/login',admincontroller.adminveri)
router.get('/product',auth.sessionCheck,productController.loProduct)
router.post('/product',auth.sessionCheck,upload.array('image',4),productController.inserProduct)
router.get('/product_page',auth.sessionCheck,productController.productPost)
router.get('/product_edit',productController.productEdit)
router.post('/product_edit',auth.sessionCheck,upload.array('image',4),productController.productUpadte)
router.get('/product_delete',auth.sessionCheck,productController.productDelete)
router.get('/logout',auth.sessionCheck,auth.logout)
/*----------------------------------category page---------------------------------*/
router.get('/category',auth.sessionCheck,categoryController.categoryPage)
router.get('/category_add',auth.sessionCheck,categoryController.addCategory)
router.post('/category_add',auth.sessionCheck,upload.single('image'),categoryController.categoryInsert)
router.get('/category_edit',auth.sessionCheck,categoryController.cateEdit)
router.post('/category_edit',auth.sessionCheck,upload.single('image'),categoryController.cateUpdate)
router.get('/category_delete',auth.sessionCheck,categoryController.cateDelete)
/*----------------------------------custmoer page---------------------------------*/
router.get('/custmoer_page',auth.sessionCheck,custmoerController.custmoerPage)
router.get('/custmoer_block',auth.sessionCheck,custmoerController.userBlock)
/*----------------------------------banner mangement---------------------------------*/
router.get('/banner_page',auth.sessionCheck,bannerController.banner_page)
router.get('/add_banner',auth.sessionCheck,bannerController.add_Banner)
router.post('/add_banner',auth.sessionCheck,upldPic.single('image'),bannerController.insert_banner)
router.delete('/delete',auth.sessionCheck,bannerController.banner_delete)
/*----------------------------------coupon---------------------------------*/
router.get('/coupon_page',auth.sessionCheck,couponController.coupon_page)
router.get('/add_coupon',auth.sessionCheck,couponController.add_Coupon_page)
router.post('/add_coupon',auth.sessionCheck,couponController.coupon_insert)
router.get('/coupon_block',auth.sessionCheck,couponController.coupon_blocking)
/*----------------------------------order-------------------------------------*/
router.get('/order_page',auth.sessionCheck,orderController.order_page)
router.patch('/order_update',auth.sessionCheck,orderController.order_upte)
router.get('/saleReport',auth.sessionCheck,orderController.saleReport)
router.get('/export',auth.sessionCheck,exportPDF.exportorder)
module.exports = router
