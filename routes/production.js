var express = require('express');
//import controllers
const { getProductionData, newProductionEntry } = require('../controllers/manufacture.controller');
const { checkIfGoodsExists, updateFinishedGoods, getFinishedGoods, getComposition } = require('../controllers/finishedGoods.controller');
const { useRawMaterials, checkIfEnough } = require('../controllers/rawMaterials.controller');
var router = express.Router();

//define route behavior
router.get('/print',getProductionData);

router.post('/',checkIfGoodsExists, getComposition, checkIfEnough, useRawMaterials, newProductionEntry, updateFinishedGoods);

router.get('/', getFinishedGoods)

module.exports = router;