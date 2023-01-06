 const userVerfiy = async(req,res,next)=>{
   if(req.session.userlo){
           next()
    }else{
        res.render('user/login.ejs')
    }
 }
 const signOut = async(req,res)=>{
  req.session.destroy();
  console.log('sign out');
  res.redirect('/')
  res.end()
 }

 
 module.exports = {
  
  userVerfiy,
  signOut

 }