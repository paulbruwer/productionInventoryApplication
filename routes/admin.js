var express = require("express");

//import controllers
const { deleteDispatch } = require("../controllers/dispatch.controller");
const {
  deleteReceiving,
  getReceivingItem,
  editReceivingItem,
} = require("../controllers/receiving.controller");
const {
  deleteProduction,
  getProductionItem,
  editProductionItem,
} = require("../controllers/manufacture.controller");
const {
  getRawMaterials,
  checkIfMaterialExists,
} = require("../controllers/rawMaterials.controller");
const {
  getFinishedGoods,
  checkIfGoodsExists,
} = require("../controllers/finishedGoods.controller");
var router = express.Router();

//define all admin route behavior
router.delete("/dispatch", deleteDispatch);

router.delete("/receiving", deleteReceiving);

router.post("/receiving", getReceivingItem);

router.put("/receiving", checkIfMaterialExists, editReceivingItem);

router.delete("/production", deleteProduction);

router.post("/production", getProductionItem);

router.put("/production", checkIfGoodsExists, editProductionItem);

router.get("/rawMaterials", getRawMaterials);

router.get("/finishedGoods", getFinishedGoods);

module.exports = router;
