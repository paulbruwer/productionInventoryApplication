var express = require('express');
const { matchPassword } = require('../controllers/users.controller');
const { loginUser } = require('./middelware');
var router = express.Router();

//define login route and behavior
router.post("/login", matchPassword, loginUser);

module.exports = router;
