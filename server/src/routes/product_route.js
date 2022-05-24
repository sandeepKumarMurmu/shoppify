const express = require("express");
const { Product_controller } = require("../controllers/product_controller");

const router = express.Router();

router.get("/fashion", Product_controller);

module.exports = router;
