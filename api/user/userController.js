'use strict';
// function login(req, res, next) {
//    res.type('text/plain');
//   // res.staus(200);
//   res.send("login ok");
//
// }

var  axios = require("axios");
var urlencode = require("urlencode");
var querystring = require('querystring');


// var instance = axios.create({data: {
//     request: '{"sendType":"3","mobileNumber":"13262591961"}'
// }});


// var instance = axios({
//     method: 'post',
//     url: 'http://www.theunifi.com/nono-web/uniFi/sendSmsCode',
//     data: {
//         request: '{"sendType":"3","mobileNumber":"13262591961"}'
//     }
// });

var instance = axios.create();

instance.defaults.headers.post['content-type'] = 'application/x-www-form-urlencoded';

function login(req, res, next) {

    console.log("login");
    res.send("hello");
    //postUnifi(res);
}

function getHttpsGithub(res)
{
    axios.get('https://api.github.com/users/' + "piaoapiao")
    //axios.get("https://www.nonobank.com")
        .then(function(response){
            console.log(response.data);
            console.log(response.status);
            res.send(response.data);
        })
        .catch(function (e) {
            console.log(e);
            res.send(e);
        })
        ;
}

//'request':'{"sendType":"3","mobileNumber":"13262591961"}'

function postUnifi(res)
{
    // let param = new FormData();
   // param.append("request",'{"sendType":"3","mobileNumber":"13262591961"}');

    axios.post('http://www.theunifi.com/nono-web/uniFi/sendSmsCode',
        {'request':'{"sendType":"3","mobileNumber":"13262591961"}'}
        ,{transformRequest: function (data) {
    // Do whatever you want to transform the data
         return querystring.stringify(data)
    }})
        .then(function(response){
            console.log(response.data);
            console.log(response.status);
            res.send(response.data);
        })
        .catch(function (e) {
            console.log(e);
            res.send(e.message);
        })
    ;

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

