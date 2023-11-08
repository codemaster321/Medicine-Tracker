const express = require("express");
const indexController = require("../controllers/index");
const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/", isAuth, indexController.getIndex);

router.get("/form", isAuth, indexController.getForm);

router.post("/form", isAuth, indexController.postForm);

router.get("/login", indexController.loginForm);

router.post("/login", indexController.postLogin);

router.get("/signup", indexController.getSignup);

router.post("/signup", indexController.postSignup);

router.get("/logout", indexController.postLogout);

router.post("/item-delete", isAuth, indexController.deleteItem);

module.exports = router;
