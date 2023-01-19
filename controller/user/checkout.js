const user = require("../../models/userModel");
const cart = require("../../models/cartModel");
const coupon = require("../../models/coupon");
const order = require("../../models/order");
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
    console.log(error);
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
    console.log(error);
  }
};

const showAddress = async (req, res) => {
  try {
    const Id = req.session.userlo;

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
    console.log(show);
    let order_list = await order.find({ userId: userId }).sort({ _id: -1 });
    res.render("user/profile", { show, order_list });
  } catch (error) {
    console.log(error);
  }
};

const defaultSet = async (req, res) => {
  try {
    const Id = req.session.userlo;
    const iddd = req.query.id;

    const check = await user.updateMany(
      { _id: Id, "address.primary": true },

      {
        $set: {
          "address.$.primary": false,
        },
      }
    );

    const another = await user
      .updateOne(
        { _id: Id, "address._id": iddd },
        {
          $set: {
            "address.$.primary": true,
          },
        }
      )
      .then(() => {
        res.redirect("/profile");
      });
  } catch (error) {
    console.log(error);
  }
};

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
  } catch (error) {
    console.log(error);
  }
};

const editAddress = async (req, res) => {
  try {
    const Id = req.session.userlo;
    const AddId = req.query.id;

    const change = await user.find(
      { _id: mongoose.Types.ObjectId(Id) },
      { address: { $elemMatch: { _id: AddId } } }
    );
    res.render("user/editAdd", { change });
  } catch (error) {
    console.log(error);
  }
};
const Addupdate = async (req, res) => {
  try {
    let id = req.query.id;
    let data = req.body;
    let userId = req.session.userlo;
    const updateAddress = await user
      .updateOne(
        { _id: mongoose.Types.ObjectId(userId), "address._id": id },
        {
          $set: {
            "address.$.FirstName": data.FirstName,
            "address.$.LastName": data.LastName,
            "address.$.Address": data.Address,
            "address.$.State": data.State,
            "address.$.Email": data.Email,
            "address.$.phone": data.phone,
            "address.$.postCode": data.postCode,
            "address.$.FirstName": data.FirstName,
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

const payment = async (req, res) => {
  try {
  
    let userId = req.session.userlo;
    const detailss = await cart.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId(userId) },
      },
      {
        $unwind: "$cartItems",
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
    ]);

    const subtotal = detailss.reduce((acc, cur) => {
      acc = acc + cur.TotalPrice;
      return acc;
    }, 0);

    const defaultset = await user.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(userId) },
      },
      {
        $unwind: "$address",
      },
      {
        $match: { "address.primary": true },
      },
    ]);
    const show = await user.findOne({ _id: mongoose.Types.ObjectId(userId) });
    const Address = show.address;
    const couponData = await coupon.find();
    console.log(couponData);
    if(detailss.length > 0 ){
    res.render("user/payment.ejs", {
      defaultset,
      detailss,
      Address,
      subtotal,
      couponData,
    
    });
  }else{
    res.redirect('/')
  }
  } catch (error) {
    console.log(error.message);
  }
};
const changeOption = async (req, res) => {
  try {
    let id = req.body.address;
    const userId = req.session.userlo;
    const check = await user.updateMany(
      { _id: userId, "address.primary": true },

      {
        $set: {
          "address.$.primary": false,
        },
      }
    );

    const another = await user
      .updateOne(
        { _id: userId, "address._id": id },
        {
          $set: {
            "address.$.primary": true,
          },
        }
      )
      .then(() => {
        res.redirect("/payment");
      });
  } catch (error) {
    console.log(error);
  }
};
const applycoupon = async (req, res) => {
  try {
    let data = req.body;
    let coupon_cde = data.copuoncode;
    let find = data.subTotal;
    let Total = parseInt(find);
    const Id = req.session.userlo;
    const userId = mongoose.Types.ObjectId(Id);

    const coupon_check = await coupon.findOne({ couponName: coupon_cde });
    console.log(coupon_check);

    if (coupon_check) {
      let currentDate = new Date();
      if (
        currentDate >= coupon_check.startingDate &&
        currentDate <= coupon_check.expiryDate
      ) {
        let userCheck = coupon_check.users.findIndex(
          (users) => users.userId == Id
        );

        userCheck = parseInt(userCheck);
        if (userCheck === -1) {
          if (Total > coupon_check.minDiscount) {
            let discount = coupon_check.discount;
            let total = Total;
            let discountParentage = (total * discount) / 100;
            let finnalDiscount = total - discountParentage;
            var apply = " Apply succeeed ";
            let couponId = coupon_check._id;
            console.log(couponId);
            res.json({ finnalDiscount, apply, couponId });
          } else {
            var maximum = "purchese Above 1000 ";
            res.json({ maximum });
          }
        } else {
          var userEx = "Already Existed Coupon";
          res.json({ userEx });
        }
      } else {
        var exprire = "Your coupon is Exprired";
        res.json({ exprire });
      }
    } else {
      var invalid = "copuon is not valid";
      res.json({ invalid });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  insertaddress,
  showAddress,
  defaultSet,
  addDelete,
  addAddress,
  editAddress,
  Addupdate,
  payment,
  changeOption,
  applycoupon,
};
