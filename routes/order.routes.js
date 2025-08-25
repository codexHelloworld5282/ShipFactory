const express = require("express");
const CourierController = require("../controllers/order.controller.js");

const router = express.Router();

router.post("/create", CourierController.create);
router.post("/cancel", CourierController.cancel);

module.exports = router;
