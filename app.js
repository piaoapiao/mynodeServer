var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// var upload = require('./app/upload');

var fs = require('fs');
var path = require('path');

var serveIndex = require('serve-index');

var app = express();

app.use(morgan("short"));

app.use('/public', serveIndex(__dirname, {'icons': true}))

app.use(function (req, res, next) {
    // if (req.clientIp === '::1') { // local test, do mock
    //     req.clientIp = randomIp('218.1.33.190', 16, 24);
    // } else if (/^::ffff:/.test(req.clientIp)) { // only support ipv4 now
    //     req.clientIp = req.clientIp.replace(/^::ffff:/, '');
    // }
    console.log(req.remoteAddress);
    next();
});

// app.use(morgan('combined'));

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: accessLogStream}));



 // app.use(bodyParser.urlencoded({ extended: false }));
 //
 // app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(function(req, res, next) {
    next();
})

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// });

//
// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// });

// var jsonParser = bodyParser.json();

// /var urlencodedParser = bodyParser.urlencoded({ extended: false });

 //app.use(bodyParser.json({ type: 'text/plain' }));   // application/json   需要指定类型     ;charset=UTF-8
// app.use(bodyParser.json({ type: 'application/json' }));

// app.use(bodyParser.json({ type: 'text2/plain' }))

// app.post('/api/users', jsonParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400)
//     // create user in req.body
// })

// app.post('/api/users', jsonParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400)
//     console.log("------");
//     console.log(req.body);
//     res.send("login ok:"+req.body);
//     // create user in req.body
// });


// app.post('/login', urlencodedParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400)
//     res.send('welcome, ' + req.body.username)
// })



// app.use(bodyParser);

// app.use(bodyParser.raw);

//app.use(bodyParser.raw);
//app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({
//     extended: false});



// app.use(bodyParser.urlencoded({
//     extended: false,
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));



// app.use(bodyParser.json({
//     verify: function (req, res, buf, encoding) {
//       console.log(req.rawBody);
//         req.rawBody = buf;
//     }
// }));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),{}));

//   http://192.168.35.6:3000/images/snow.jpg  图片地址

// app.use(bodyParser.json());

// app.use(bodyParser.json());

// app.use(bodyParser.json({
//     verify: function(req, res, buf, encoding) {
//
//         // sha1 content
//         // var hash = crypto.createHash('sha1');
//         // hash.update(buf);
//         // req.hasha = hash.digest('hex');
//         // console.log("hash", req.hasha);
//
//         // get rawBody
//         req.rawBody = buf.toString();
//         console.log("rawBody", req.rawBody);
//
//     }
// }));

app.use('/', index);
app.use('/users', users);

app.use('/user', require('./api/user'));

app.use('/crash', require('./api/crash'));

app.use('/fileupload', require("./api/upload"));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
