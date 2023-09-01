const Product = require("../models/product");
let arr = [];
exports.getIndex = (req, res, next) => {
  res.render("index/index", {
    arr: arr,
  });
};

exports.getForm = (req, res, next) => {
  res.render("index/form");
};

exports.postForm = (req, res, next) => {
  console.log(req.body);
  const product = new Product({
    medicine: req.body.medicine,
    expiry: req.body.expirydate,
    imageUrl: req.body.image,
  });
  product.save().then((result) => {
    res.redirect("/");
  });
};
