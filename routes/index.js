const express = require("express");
const indexController = require("../controllers/index");

const router = express.Router();

router.get("/", indexController.getIndex);

router.get("/form", indexController.getForm);

router.post("/form", indexController.postForm);

module.exports = router;
