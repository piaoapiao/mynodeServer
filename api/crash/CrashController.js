'use strict';

var  axios = require("axios");
var urlencode = require("urlencode");
var querystring = require('querystring');

var formidable = require('formidable')
var winston = require('winston');



function saveCrashLog(req,res)
{
    //console.log(JSON.stringify(request.body));

    // res.setHeader('Content-Type', 'application/json');

    // winston.add(winston.transports.File, {
    //     filename: './log/error.log',
    //     handleExceptions: true,
    //     humanReadableUnhandledException: true
    // });
    // winston.log('info',  req.method.toUpperCase(),req.url,JSON.stringify(req.body));

    // logger.error()

    // res.send(req.body);

    // res.cookie('monster', 'nom nom');

    // res.writeHead(200, {'Content-type' : 'text/html'});

    // res.writeHead({
    //     'Set-Cookie':'myCookie="type=ninja", "language=javascript";path="/";httpOnly=true;'
    // });

    // res.cookie('signed_monster', 'nom nom', { signed: true });


    // res.writeHead(200, {
    //     'Content-Type': 'text/plain',
    //     'Set-Cookie': 'myCookie="type=ninja", "language=javascript";path="/"'
    // });

    res.cookie('isVisit', '0');

    res.end('Homepage');

    // var body = 'hello world1';
    // res.send(body);






   // res.send(req.query.userid);

    // var form = new formidable.IncomingForm();
    //
    // form.parse(req, function(err, fields, files) {
    //      // res.writeHead(200, {'content-type': 'text/plain'});
    //     res.setHeader('Content-Type', 'application/json');
    //      console.log(fields);
    //     res.send(fields);
    //
    // });

}



module.exports = {
    saveCrashLog:saveCrashLog
}