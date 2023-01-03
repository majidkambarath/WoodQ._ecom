const user = require('../../models/userModel')
const mongoose = require("mongoose");

const insertaddress = async (req,res)=>{

    try {
      const Id = req.session.userlo;
      const data = req.body;
      const Address = await user.updateOne({ _id:Id },
        {
          $push:{
            address:{
                FirstName:data.fname,
                LastName:data.lname,
                Address:data.address,
                State:data.state,
                postCode:data.post,
                Email:data.email,
                phone:data.phone,
                primary:false
              
            }
          }
        }
        
        ).then(()=>{
           
            res.redirect('/profile')
            
        })
    } catch (error) {
    console.log(error.message);
  }
  
  }

  const showAddress = async(req,res)=>{
    try {
        const Id = req.session.userlo;
        console.log(Id);
        const userId = mongoose.Types.ObjectId(Id)
        const show = await user.aggregate([
            {
              $match:{ _id: userId}
            
            },
            {
                $unwind : "$address"
            },
            {
                $project: {
                    FirstName:"$address.FirstName",
                    LastName:"$address.LastName",
                    address:"$address.Address",
                    State:"$address.State",
                    Code:"$address.postCode",
                    Email:"$address.Email",
                    phone:"$address.phone",
                    primary:"$address.primary",
                    _id:"$address._id"

                }
            }
        ])
         res.render('user/checkOut.ejs',{show})
      // console.log(show);
      
    } catch (error) {
        console.log(error.message);
    }
  }

  // const defaultSet = async(req,res)=>{
  //     try {
  //    const Id = req.session.userlo;
  //   const iddd = req.query.id;
  // console.log(iddd);
  //   const check  = await user.updateMany({ _id: Id , "address.primary":true},
      
  //   {
  //     $set:{
  //       "address.$.primary":false
  //     }
  //   }
    
  //   );
  //   const another = await user.updateOne({ _id:Id, " address._id":iddd},
  //   {
  //     $set:{
  //       "address.$.primary":true
  //     }
  //   }
    
  //   ).then(()=>{
  //     res.redirect('/checkOut')
  //   })
        
  //     } catch (error) {
  //       console.log(error.message);
  //     }

  //      }

       const addDelete = async(req,res)=>{
        try {
          const Id = req.session.userlo;
          const AddId = req.query.id;
        
          const deleteAdd = await user.updateOne({ _id: Id },
             {
              $pull: { address: { _id : AddId } }
             } 
            
      
            ).then(()=>{
             
              res.redirect('/checkOut')
            })
           console.log(deleteAdd);
        } catch (error) {
          console.log(error.message);
        }
      }
module.exports={
 insertaddress,
 showAddress,
//  defaultSet,
 addDelete
}


