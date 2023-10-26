var express = require('express');
const { getDispatchData, newDispatchEntry } = require('../controllers/dispatch.controller');
const { checkIfEnough, dispatchFinishedGoods } = require('../controllers/finishedGoods.controller');
var router = express.Router();

router.get('/print',getDispatchData);

router.post('/' ,checkIfEnough ,dispatchFinishedGoods ,newDispatchEntry);

module.exports = router;