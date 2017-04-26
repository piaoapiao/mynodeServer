'use strict';

var express = require('express');

var router = express.Router();

var controller = require('./CrashController');

//http://localhost:3000/user/login

// http://localhost:3000/crash/saveCrashLog

//router.post('/saveCrashLog', controller.saveCrashLog);

router.get('/saveCrashLog', controller.saveCrashLog);

module.exports = router;