var express = require('express');
const { getProductionData, newProductionEntry } = require('../controllers/manufacture.controller');
const { checkIfGoodsExists, updateFinishedGoods, getFinishedGoods, getComposition } = require('../controllers/finishedGoods.controller');
const { useRawMaterials, checkIfEnough } = require('../controllers/rawMaterials.controller');
var router = express.Router();

router.get('/print',getProductionData);

router.post('/',checkIfGoodsExists, getComposition, checkIfEnough, useRawMaterials, newProductionEntry, updateFinishedGoods);

router.get('/', getFinishedGoods)

module.exports = router;