exports.sessionCheck = (req,res,next)=>{
    try {
        if(req.session.admin){
           next()
        }else{
            res.redirect('/admin/login')
        }
    } catch (error) {
       console.log(error); 
    }
}

exports.logout = (req,res)=>{
    try {
        req.session.destroy();
        console.log('sign out');
        res.redirect('/admin/login')
        res.end()
        
    } catch (error) {
        console.log(error);
    }
}