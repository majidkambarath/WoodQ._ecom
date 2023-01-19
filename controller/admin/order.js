const order = require("../../models/order");

exports.order_page = async (req, res) => {
  try {
    let findData = await order.find();

    res.render("admin/order", { findData });
  } catch (error) {
    console.log(error);
  }
};

exports.order_upte = async (req, res) => {
  try {
    let data = req.body;
    let orderId = data.orderId;
    let status = data.orderStatus;
    await order.updateOne({ _id: orderId }, { $set: { orderStatus: status } });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.saleReport = async (req, res) => {
  try {
    let salestatus = await order.find({ orderStatus: "Devliverd" });
    console.log(salestatus);
    res.render("admin/saleReport", { salestatus });
  } catch (error) {
    console.log(error);
  }
};
