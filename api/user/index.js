'use strict';

var express = require('express');

var router = express.Router();

var controller = require('./userController');

//http://localhost:3000/user/login

router.get('/login', controller.login);  // http://localhost:3000/crash/login    http:/192.168.34.109:3000/user/login

module.exports = router;