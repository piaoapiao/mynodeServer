/**
 * Created by guodong on 2017/5/2.
 */
'use strict';

var express = require('express');

var router = express.Router();

var controller = require('./RedirectController');

//http://localhost:3000/user/login

// http://localhost:3000/crash/saveCrashLog

//router.post('/saveCrashLog', controller.saveCrashLog);

router.get('/redirect', controller.redirect);

module.exports = router;

//http://127.0.0.1:3000/redirect/redirect/?userid=123