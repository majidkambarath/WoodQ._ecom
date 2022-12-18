const express = require("express");
const router = express.Router();
const sessions = require('express-session');
const upload = require('../middleware/multer')
// const upload = multer({storage});
// const { storage , cloudinary } = require('../middleware/cloudinary');

const admincontroller = require('../controller/admin/adminController')
const productController = require('../controller/admin/productController')

router.get('/',admincontroller.dashboard)

router.get('/product',productController.loProduct)

router.post('/product',upload.single('image'),productController.inserProduct)

router.get('/product_page',productController.productPost)

module.exports = router