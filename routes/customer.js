var express = require("express");
const CustomerController = require("../controllers/CustomerController");

var router = express.Router();

router.post("/get-score", CustomerController.customerScore);

module.exports = router;