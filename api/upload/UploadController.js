/**
 * Created by guodong on 2017/4/25.
 */

// function uploadfile(req,res) {
//     res.send("upload ok");
// }


var fs = require('fs');
var os = require('os');
var path = require('path');
var formidable = require('formidable')
var util = require('util');

var multiparty = require('multiparty');

var Busboy = require('busboy');

var handleFile = function(filename, file, targetDir) {
    var targetFile = targetDir + filename;
    var fstream;

    console.log("Uploading: " + filename + ' to ' + targetFile);
    fstream = fs.createWriteStream(targetFile);
    file.pipe(fstream);

    fstream.on('close', function () {
        // Note to self: Fire off an event to handle the file in tmp here (check it, thumbs gen, record it, remove it)
        console.log('Saved file: '+filename);
    });
    fstream.on('error', function () {
        console.log('ERROR while saving file: '+filename);
    });
};

var isDefined = function(str) {
    return (typeof str != 'undefined' && null != str && '' != str);
}

// //formidable Parse form and handle files and fields.
// var uploadfile = function(req, res) {
//     console.log("here");
//
//     // var upfile = req.files.upfile;
//
//     const form = new formidable.IncomingForm();
//    // form.uploadDiros. = os.tmpDir();//上传文件的保存路径
//     //form.uploadDir = os.tmpDir();//上传文件的保存路径
//     form.uploadDir = ".";//上传文件的保存路径
//     form.keepExtensions = true;//保存扩展名
//     form.maxFieldsSize = 20 * 1024 * 1024;//上传文件的最大大小
//     form.parse(req, (err, fields, files) => {
//         console.log(fields);
//         console.log(files);
//         if (err) {
//              throw err;
//         }
//     });
//
//     res.send("ok");
// };
//
// //  multiparty upload file
// var uploadfile = function(req, res) {
//     console.log("here");
//
//     var form = new multiparty.Form();
//
//     //设置编辑
//     form.encoding = 'utf-8';
//     //设置文件存储路径
//     form.uploadDir = "/upload/";
//     //设置单文件大小限制
//     form.maxFilesSize = 2 * 1024 * 1024;
//
//     form.parse(req, function (err, fields, files) {
//         res.writeHead(200, {'content-type': 'text/plain'});
//         res.write('received upload:\n\n');
//         res.end(util.inspect({fields: fields, files: files}));
//     });
//     //res.send("ok");
// };


// //  multiparty upload file
var uploadfile = function(req, res) {

    var busboy = new Busboy({ headers: req.headers });

    var tmpFileName  = "";

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        console.log(__dirname);

        //console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

      //  var saveTo = path.join(__dirname, filename);
        var saveTo = path.join("./public/download", filename);   // . 指向 项目目录
       // console.log(saveTo)
        file.pipe(fs.createWriteStream(saveTo));

        tmpFileName =  filename;





        var wwwPath = path.join("/var/www/html", filename);   // . 指向 项目目录
        //console.log(wwwPath)
        file.pipe(fs.createWriteStream(wwwPath));




        // file.on('data', function(data) {
        //     console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        // });
        // file.on('end', function() {
        //     console.log('File [' + fieldname + '] Finished');
        // });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      //  console.log('Field [' + fieldname + ']: value: ' + val);
          console.log('field');
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');


        //var downloadurl1 = "down address1:" + "http://oneccc.bid:3000/download/" + tmpFileName;


        //var downloadurl2 = "down address2:" + "http://oneccc.bid/" + tmpFileName;

       // res.send("upload ok" + "/n" + downloadurl1 +"/n" + downloadurl2);
        res.send("gog");

        //res.writeHead(303, { Connection: 'close', Location: '/' });
        //res.end();
    });
    req.pipe(busboy);
};




module.exports = {
    uploadfile:uploadfile
}