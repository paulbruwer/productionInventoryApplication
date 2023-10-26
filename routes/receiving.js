var express = require('express');
const { getReceivingData, newReceivingEntry } = require('../controllers/receiving.controller');
const { checkIfMaterialExists, updateRawMaterial, getRawMaterials } = require('../controllers/rawMaterials.controller');
var router = express.Router();

router.get('/print',getReceivingData);

router.post('/',checkIfMaterialExists,newReceivingEntry,updateRawMaterial);

router.get("/", getRawMaterials);

module.exports = router;