var express = require('express');

//import controllers
const { deleteDispatch } = require('../controllers/dispatch.controller');
const { deleteReceiving } = require('../controllers/receiving.controller');
const { deleteProduction } = require('../controllers/manufacture.controller');
const { getRawMaterials } = require('../controllers/rawMaterials.controller');
const { getFinishedGoods } = require('../controllers/finishedGoods.controller');
var router = express.Router();

//define all admin route behavior
router.delete("/dispatch",deleteDispatch)

router.delete("/receiving",deleteReceiving)

router.delete("/production",deleteProduction)

router.get("/rawMaterials", getRawMaterials)

router.get("/finishedGoods", getFinishedGoods)

module.exports = router;