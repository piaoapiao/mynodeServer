'use strict';
// function login(req, res, next) {
//    res.type('text/plain');
//   // res.staus(200);
//   res.send("login ok");
//
// }

var  axios = require("axios");
var urlencode = require("urlencode");

var instance = axios.create();

function login(req, res, next) {
  // res.type('text/plain');
  // res.staus(200);
  // res.send("login ok");
    //requestbaidu(res);
    getHttpsGithub(res);
}

function getHttpsGithub(res)
{
    axios.get('https://api.github.com/users/' + "piaoapiao")
        .then(function(response){
            console.log(response.data);
            console.log(response.status);
            res.send(response.data);
        });

}

//  http://www.baidu.com
//  http://www.nonobank.com

// function  requestbaidu(res) {
//      var instance = axios.create();
//
//     var rtdata = instance.get('http://www.hnie.edu.cn', {
//         timeout: 5000
//     }).then(function (response) {
//         console.log("-----");
//         console.log(response.data);
//          requestbaidu2(response.data,res);
//         //res.type('text/plain');
//         // res.send(response.data);
//     });
// }
//
// function  requestbaidu2(result,res) {
//     //var instance = axios.create();
//
//     var rtdata = instance.get('http://www.baidu.com', {
//         timeout: 5000
//     }).then(function (response) {
//         console.log(response.data);
//         //result = result + response;
//          result =  response.data;
//         res.send(result);
//     });
// }







module.exports = {
  login:login
}