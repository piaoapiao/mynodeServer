/**
 * Created by guodong on 2017/4/25.
 */

// function uploadfile(req,res) {
//     res.send("upload ok");
// }


var fs = require('fs');
var os = require('os');
var formidable = require('formidable')
// var multiparty = require('multiparty');

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

// Parse form and handle files and fields.
var uploadfile = function(req, res) {
    console.log("here");

    // var upfile = req.files.upfile;

    const form = new formidable.IncomingForm();
   // form.uploadDiros. = os.tmpDir();//上传文件的保存路径
    //form.uploadDir = os.tmpDir();//上传文件的保存路径
    form.uploadDir = ".";//上传文件的保存路径
    form.keepExtensions = true;//保存扩展名
    form.maxFieldsSize = 20 * 1024 * 1024;//上传文件的最大大小
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        console.log(files);
    if (err) {
        throw err;
    }

    });
    res.send("ok");
};




    // var result = { files: [], fields: [] };
    //
    // req.busboy.on('file', function (fieldname, file, filename) {
    //     if(isDefined(filename)) {
    //         result.files.push({ name: filename});
    //         //handleFile(filename, file, os.tmpdir());
    //         handleFile(filename, file, os.tmpdir());
    //     }
    // });
    // req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    //     console.log('Field received: '+key+' = '+value);
    //     result.fields.push({ 'name': key, val: value });
    // });
    //
    // req.busboy.on('finish', function() {
    //     res.render('afterUpload', result);
    // });
    // req.pipe(req.busboy);



module.exports = {
    uploadfile:uploadfile
}