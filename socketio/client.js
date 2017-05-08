/**
 * Created by guodong on 2017/5/8.
 */

var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
    console.log("connect")
});
socket.on('event', function(data){
    console.log(data)
});

socket.on('disconnect', function(){
    console.log("disconnect")
});