 const userVerfiy = async(req,res,next)=>{
   if(req.session.userlo){
      console.log(req.session.userlo);
           next()
    }else{
      console.log(req.session.userlo);
        res.redirect('/login')
    }
 }

 module.exports ={
    userVerfiy
 }