 
const user = require('../../../models/userModel');

 exports.userVerfiy = async(req,res,next)=>{
  try {
    if(req.session.userlo){
      next()
}else{
   res.render('user/login.ejs')
}
  } catch (error) {
    console.log(error);
  }
   
 }
 exports.signOut = async(req,res)=>{
  try {
    req.session.destroy();
    console.log('sign out');
    res.redirect('/')
    res.end()
  } catch (error) {
    console.log(error);
  }
 
 }

 exports.userBlock = async(req,res,next)=>{
  try {
    let Id = req.session.userlo;
    let userFind = await user.findOne({_id:Id,status:true})
    if(userFind ){
      next()
    }else{
    res.render('user/login')
    }

  } catch (error) {
    console.log(error);
  }
 }