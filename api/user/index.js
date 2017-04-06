'use strict';

var express = require('express');

var router = express.Router();

var controller = require('./userController');

router.get('/login', controller.login);

module.exports = router;