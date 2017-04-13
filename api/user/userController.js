'use strict';
// function login(req, res, next) {
//    res.type('text/plain');
//   // res.staus(200);
//   res.send("login ok");
//
// }

var  axios = require('axios');

// function login(req, res, next) {
//   // res.type('text/plain');
//   // res.staus(200);
//   // res.send("login ok");
//     requestbaidu(res);
// }
//
// //  http://www.baidu.com
// //  http://www.nonobank.com
//
// var instance = axios.create();
//
// function  requestbaidu(res) {
//     //var instance = axios.create();
//
//     var rtdata = instance.get('http://www.hnie.edu.cn', {
//         timeout: 5000
//     }).then(function (response) {
//         console.log("-----");
//         console.log(response.data);
//         requestbaidu2(response.data,res);
//         //res.type('text/plain');
//         //res.send(response.data);
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


function getNono(){
    return axios.get('http://www.nonobank.com');
}

function gethnie(){
    return axios.get("http://www.hnie.edu.cn");
}


function login(req, res, next) {
    // res.type('text/plain');
    // res.staus(200);
    // res.send("login ok");
    //requestbaidu(res);

    axios.all([getNono(),gethnie()])
        .then(axios.spread( function(baidu,hnie){
        console.log(baidu);
            // console.log(typeof baidu);
            //  console.log(baidu.data);
            // console.log(typeof baidu);
            console.log("here");
            res.type('text/plain');
            // res.status(200);
            //res.send(baidu.data);
           // res.send(hnie.data);

            //res.send(hnie.data) + baidu.data);

            res.send(hnie.data+ baidu.data);

    }))
        .catch(function (e) {
            console.log(e);
            console.log("Promise Rejected");
        });

    // res.type('text/plain');
    // res.staus(200);
    // res.send("login ok");
}


module.exports = {
  login:login
}