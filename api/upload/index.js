'use strict';

var express = require('express');

var router = express.Router();

var controller = require('./UploadController');

//http://localhost:3000/user/login

// http://localhost:3000/crash/saveCrashLog

//router.post('/saveCrashLog', controller.saveCrashLog);

router.post('/', controller.uploadfile);

module.exports = router;