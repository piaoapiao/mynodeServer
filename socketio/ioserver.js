/**
 * Created by guodong on 2017/5/8.
 */

// var server = require('http').createServer();
// var io = require('socket.io')(server);
// io.on('connection', function(client){
//     client.on('event', function(data){
//         console.log("event");
//     });
//     client.on('disconnect', function(){
//         console.log("disconnect");
//     });
// });
// server.listen(3000);

var io = require('socket.io')();
io.on('connection', function(client){
    console.log("connection");
});
io.listen(3000);