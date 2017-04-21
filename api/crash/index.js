'use strict';

var express = require('express');

var router = express.Router();

var controller = require('./CrashController');

//http://localhost:3000/user/login

router.post('/saveCrashLog', controller.saveCrashLog);  // http://localhost:3000/crash/saveCrashLog

module.exports = router;