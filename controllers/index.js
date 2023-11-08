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

  User.findOne({ email: username })
    .then((user) => {
      if (!user) {
        return res.render("index/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          console.log("matched");
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

exports.getSignup = (req, res, next) => {
  res.render("index/signup");
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: username,
        password: hashedPassword,
        cart: { items: [] },
      });
      console.log("reached here");
      return user.save();
    })
    .then((result) => {
      res.redirect("/login");
      // return transporter.sendMail({
      //   to: email,
      //   from: 'shop@node-complete.com',
      //   subject: 'Signup succeeded!',
      //   html: '<h1>You successfully signed up!</h1>'
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.deleteItem = (req, res, next) => {
  const id = req.body.productId;
  Product.findByIdAndRemove(id)
    .then((result) => {
      console.log("Deleted");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
