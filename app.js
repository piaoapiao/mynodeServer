var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.use(bodyParser.json());
//
// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// });

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json({ type: 'text/plain' }))

// app.post('/api/users', jsonParser, function (req, res) {
//     if (!req.body) return res.sendStatus(400)
//     // create user in req.body
// })

app.post('/api/users', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    console.log("------");
    console.log(req.body);
    res.send("login ok:"+req.body);
    // create user in req.body
});


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

app.use('/crash', require('./api/crash'));

// app.use(bodyParser.urlencoded({
//     extended: false,
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));



// app.use(bodyParser.json({
//     verify: function (req, res, buf, encoding) {
//       console.log(req.rawBody);
//         req.rawBody = buf;
//     }
// }));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
