var express = require('express');
//import controllers
const { getReceivingData, newReceivingEntry } = require('../controllers/receiving.controller');
const { checkIfMaterialExists, updateRawMaterial, getRawMaterials } = require('../controllers/rawMaterials.controller');
var router = express.Router();

//define receiving route behavior
router.get('/print',getReceivingData);

router.post('/',checkIfMaterialExists,newReceivingEntry,updateRawMaterial);

router.get("/", getRawMaterials);

module.exports = router;