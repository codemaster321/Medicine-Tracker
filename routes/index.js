const express = require("express");
const indexController = require("../controllers/index");

const router = express.Router();

router.get("/", isAuth, indexController.getIndex);

router.get("/form", isAuth.indexController.getForm);

router.post("/form", isAuth, indexController.postForm);

router.get("/login", indexController.loginForm);

router.post("/login", indexController.postForm);

module.exports = router;
