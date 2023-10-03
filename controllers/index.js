const Product = require("../models/product");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getIndex = (req, res, next) => {
  Product.find().then((prods) => {
    console.log(prods);
    res.render("index", { prods: prods });
  });
};

exports.getForm = (req, res, next) => {
  res.render("index/form");
};

exports.postForm = (req, res, next) => {
  console.log(req.file);
  const image = req.file;
  console.log(image.path);

  const product = new Product({
    medicine: req.body.medicine,
    expiry: req.body.expirydate,
    image: image.path,
  });
  product.save().then((result) => {
    res.redirect("/");
  });
};

exports.loginForm = (req, res, next) => {
  res.render("index/login");
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find({ email: email })
    .then((user) => {
      if (!user) {
        return res.render("index/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }

          return res.status(422).render("index/login");
        })
        .catch((err) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
