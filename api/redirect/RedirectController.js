/**
 * Created by guodong on 2017/5/2.
 */
'use strict';

var  axios = require("axios");
var urlencode = require("urlencode");
var querystring = require('querystring');

var formidable = require('formidable')
var winston = require('winston');



function redirect(req,res)
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

    //res.send(req.query.userid);

    //res.location('http://www.csdn.net');



    res.location('../../crash/saveCrashLog');

    res.statusCode = 302;
    res.end('响应的内容');

    //res.send("ok");

    //res.location('back');

    //res.location('crash/saveCrashLog');

   // res.redirect(302, 'http://baidu.com');


    //res.redirect(302, 'http://baidu.com');

    // res.redirect(302, 'http://www.nonobank.com');

    //res.redirect(302, 'http://www.hnie.edu.cn');

    //res.redirect(302, 'http://www.taobao.com');

    //  http://localhost.charlesproxy.com:3000/redirect/redirect?id=888

    //  301 之后缓存，不能恢复  302 临时定向，方便恢复

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
    redirect:redirect
}