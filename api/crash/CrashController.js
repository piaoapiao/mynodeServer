'use strict';

var  axios = require("axios");
var urlencode = require("urlencode");
var querystring = require('querystring');

var formidable = require('formidable')




function saveCrashLog(req,res)
{
    //console.log(JSON.stringify(request.body));

    // res.setHeader('Content-Type', 'application/json');

    //res.send(req.body);

    res.send(req.query.userid);

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