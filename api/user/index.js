'use strict';

var express = require('express');

var router = express.Router();

var controller = require('./userController');   

router.get('/login', controller.login);  // http://localhost:3000/user/login

module.exports = router;