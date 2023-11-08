var express = require("express");
//import controllers
const {
  getDispatchData,
  newDispatchEntry,
} = require("../controllers/dispatch.controller");
const {
  checkIfEnough,
  dispatchFinishedGoods,
} = require("../controllers/finishedGoods.controller");
var router = express.Router();

//define dispatch route behavior
router.get("/print", getDispatchData);

router.post("/", checkIfEnough, dispatchFinishedGoods, newDispatchEntry);

module.exports = router;
