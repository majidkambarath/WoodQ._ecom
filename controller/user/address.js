const user = require("../../models/userModel");
const cart = require("../../models/cartModel")
const mongoose = require("mongoose");

const insertaddress = async (req, res) => {
  try {
    const Id = req.session.userlo;
    const data = req.body;
    const Address = await user
      .updateOne(
        { _id: Id },
        {
          $push: {
            address: {
              FirstName: data.fname,
              LastName: data.lname,
              Address: data.address,
              State: data.state,
              postCode: data.post,
              Email: data.email,
              phone: data.phone,
              primary: false,
            },
          },
        }
      )
      .then(() => {
        res.redirect("/profile");
      });
  } catch (error) {
    console.log(error.message);
  }
};

const addAddress = async (req, res) => {
  try {
    const Id = req.session.userlo;
    const data = req.body;
    const Address = await user
      .updateOne(
        { _id: Id },
        {
          $push: {
            address: {
              FirstName: data.fname,
              LastName: data.lname,
              Address: data.address,
              State: data.state,
              postCode: data.post,
              Email: data.email,
              phone: data.phone,
              primary: false,
            },
          },
        }
      )
      .then(() => {
        res.redirect("/checkOut");
      });
  } catch (error) {
    console.log(error.message);
  }
};

const showAddress = async (req, res) => {
  try {
    const Id = req.session.userlo;
    console.log(Id);
    const userId = mongoose.Types.ObjectId(Id);
    const show = await user.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $unwind: "$address",
      },
      {
        $project: {
          FirstName: "$address.FirstName",
          LastName: "$address.LastName",
          address: "$address.Address",
          State: "$address.State",
          Code: "$address.postCode",
          Email: "$address.Email",
          phone: "$address.phone",
          primary: "$address.primary",
          _id: "$address._id",
        },
      },
    ]);

    res.render("user/profile",{show});
     console.log(show[0].primary);
  } catch (error) {
    console.log(error.message);
  }
};

const defaultSet = async(req,res)=>{
    try {
   const Id = req.session.userlo;
  const iddd = req.query.id;

  const check  = await user.updateMany({ _id: Id,"address.primary":true},

  {
    $set:{
      "address.$.primary":false,
    },
  }

  );

  const another = await user.updateOne({ _id:Id,"address._id":iddd},
  {
    $set:{
      "address.$.primary":true
    }
  }

  ).then(()=>{
   
    res.redirect('/profile')
  })

    } catch (error) {
      console.log(error.message);
    }

     }

const addDelete = async (req, res) => {
  try {
    const Id = req.session.userlo;
    const AddId = req.query.id;

    const deleteAdd = await user
      .updateOne(
        { _id: Id },
        {
          $pull: { address: { _id: AddId } },
        }
      )
      .then(() => {
        res.redirect("/profile");
      });
    console.log(deleteAdd);
  } catch (error) {
    console.log(error.message);
  }
};

const editAddress = async (req, res) => {
  try {
    const Id = req.session.userlo;
    const AddId = req.query.id;
    console.log(AddId);
    const change = await user.find(
      { _id: mongoose.Types.ObjectId(Id) },
      { address: { $elemMatch: { _id: AddId } } }
    );
    res.render("user/editAdd", { change });
  } catch (error) {
    console.log(error.message);
  }
};
const Addupdate = async (req,res)=>{
   try {
    let id = req.query.id
    let data = req.body
    let userId = req.session.userlo;
    const updateAddress = await user.updateOne({ _id:mongoose.Types.ObjectId(userId),"address._id":id},
    {
      $set:{
        "address.$.FirstName":data.FirstName,
        "address.$.LastName":data.LastName,
        "address.$.Address":data.Address,
        "address.$.State":data.State,
        "address.$.Email":data.Email,
        "address.$.phone":data.phone,
        "address.$.postCode":data.postCode,
        "address.$.FirstName":data.FirstName,
      }
    }
    ).then(()=>{
      res.redirect('/profile')
    })
    console.log(updateAddress);
   } catch (error) {
    console.log(error.message);
   }
}

const payment = async(req,res)=>{
  try {
    let userId = req.session.userlo;
    const detailss = await cart.aggregate([
      {
        $match:{userId:mongoose.Types.ObjectId(userId)}
      },
      {
        $unwind: "$cartItems"
      },
      {
        $project: {
        
          productId: "$cartItems.productId",
          qtyItems: "$cartItems.qty",
     

        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "carts",
        },
      },
      {
        $project: {
     
          productId: 1,
          qtyItems: 1,
          carts: { $arrayElemAt: ["$carts", 0] },
        },
      },
      {
        $addFields: {
          TotalPrice: {
            $sum: { $multiply: ["$qtyItems", "$carts.salePrice"] },
          },
        },
      },
    ])
    const subtotal = detailss.reduce((acc, cur) => {
      acc = acc + cur.TotalPrice;
      return acc;
    }, 0);
  
// console.log(detailss);

    const defaultset = await user.aggregate([
      {
        $match:{_id: mongoose.Types.ObjectId(userId)}
      },
      {
        $unwind:"$address"
      },
      {
        $match:{'address.primary':true}
      }
    ])
    // const sub = await subtotal(userId)
    // const len = subtotal.length
    console.log(defaultset);
    // const totalcount = sub[0].total
    // const amonut = parseInt(totalcount)
    // console.log(amonut);
    const show = await user.findOne({_id:mongoose.Types.ObjectId(userId)})
    const Address = show.address

    res.render('user/payment.ejs',{defaultset,detailss,Address,subtotal})

  } catch (error) {
    console.log(error.message);
  }
}
const changeOption = async(req,res)=>{
  try {
      let id = req.body.address
      const userId = req.session.userlo;
      const check  = await user.updateMany({ _id: userId,"address.primary":true},

      {
        $set:{
          "address.$.primary":false,
        },
      }
    
      );
    
      const another = await user.updateOne({ _id:userId,"address._id":id},
      {
        $set:{
          "address.$.primary":true
        }
      }
    
      ).then(()=>{
       
        res.redirect('/payment')
      })
    
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
  insertaddress,
  showAddress,
   defaultSet,
  addDelete,
  addAddress,
  editAddress,
  Addupdate,
  payment,
  changeOption
};