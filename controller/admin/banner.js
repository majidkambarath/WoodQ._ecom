const banner = require('../../models/banner')
var sharp = require('sharp')
const banner_page = async(req,res)=>{
    try {
        let banner_view = await banner.find()
        let image = banner_view
        console.log(image);
        res.render('admin/banner',{image})

    } catch (error) {
       console.log(error); 
    }
}
const add_Banner = async(req,res)=>{
    try {
        res.render('admin/addBanner')
    
    } catch (error) {
       console.log(error); 
    }
}

const insert_banner = async(req,res)=>{
    try {
    
        let bannerData = new banner({
            name:req.body.Name,
           image:req.filename
        })
        await bannerData.save();
        res.redirect('/admin/banner_page')
        
    } catch (error) {
       console.log(error); 
    }
}

module.exports = {
    banner_page,
    insert_banner,
    add_Banner
}