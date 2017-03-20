/**
 * Created by guodong on 2017/3/19.
 */

var Q=require('q');

var fs=require('fs');

var  axios = require('axios');

// require("babel-core/register");
//
// var async = require('async');
//
// var async = require('asyncawait/async');
//
// var await = require('asyncawait/await');


// Resolve一个thennable对象
var p1 = Promise.resolve({
    then: function(onFulfill, onReject) { onFulfill5("fulfilled!"); }
});

console.log(p1 instanceof Promise) // true, 这是一个Promise对象


p1.then(function(v) {
    console.log(v); // 输出"fulfilled!"
}, function(e) {
    // 不会被调用
});

// npm install babel-cli



var p2 = Promise.resolve("Success");

console.log(p2 instanceof Promise) // true, 这是一个Promise对象

Promise.resolve("Success").then(function(value) {
    console.log(value); // "Success"
}, function(value) {
    // 不会被调用
});

var original = Promise.resolve(true);
var cast = Promise.resolve(original);
cast.then(function(v) {
    console.log(v); // true
});


var p = Promise.resolve([1,2,3]);
p.then(function(v) {
    console.log(v[0]); // 1
});


let myFirstPromise = new Promise((resolve, reject) => {
        //We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
        //In this example, we use setTimeout(...) to simulate async code.
        //In reality, you will probably be using something like XHR or an HTML5 API.
        console.log("execute promise");
        setTimeout(function(){
            resolve("Success!!"); //Yay! Everything went well!
        }, 250);
});

console.log("after execute promise");


// myFirstPromise.then((successMessage) => {
//     //successMessage is whatever we passed in the resolve(...) function above.
//     //It doesn't have to be a string, but if it is only a succeed message, it probably will be.
//     console.log("Yay! " + successMessage);
// });

Promise.resolve('foo.txt').then(read).then(read)



function read(fn){

    fs.readFile(fn,'utf-8',function(err,data){

        if(err){

            console.log('err')

        }

        console.log(data+"\n");

    })

    return 'foo2.txt';

}


var p1 = Promise.resolve({
    then: function(onFulfill, onReject) {
        console.log("Hha");
        onFulfill('fulfilled!');
        console.log("Hha2");
        // onReject("error")
    }
});

p1.then(function(v) {
    console.log(v); // "fulfilled!"
}, function(e) {
    console.log(e);
    // not called
});


// Thenable throws before callback
// Promise rejects
var thenable = { then: function(resolve,reject) {
    console.log("throw error");

    // resolve('Resolving');
     reject("gogo");
    // resolve('gogo');
    throw new TypeError('Throwing');
}};



var p2 = Promise.resolve(thenable);
p2.then(function(v) {
    // not called
    console.log("not called")
}, function(e) {
    console.log("e called")
    //console.log(e); // TypeError: Throwing
});


//http://www.cnblogs.com/lihuanqing/p/6495020.html?utm_source=itdadao&utm_medium=referral

var sleep =  function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function (){
        resolve('ok');
        }, time);
    })
};



//
// var start2 = async function() {
//     let result = async sleep(3000);
//     console.log(result); // 收到 ‘ok’
// };



// async function myFirstAsyncFunction() {
//     try {
//         const fulfilledValue = await promise;
//     }
//     catch (rejectedValue) {
//         // …
//     }
// }

//
// var instance = axios.create({
//     baseURL: 'https://baidu.com',
//     timeout: 1000
// });

var instance = axios.create();

var rtdata = instance.get('https://www.baidu.com', {
    timeout: 5000
}).then(function (response) {
    console.log(response.data);

});

console.log(rtdata);

