var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var csrf = require('csurf')

// var upload = require('./app/upload');

var fs = require('fs');
var path = require('path');

var serveIndex = require('serve-index');



var cookieSession = require('cookie-session')

// var  csurf =  require('csurf');
//
// app.use(csurf);
// app.use(function(req, res, next){
//     res.locals._csrfToken = req.csrfToken();
//     next(); });

// setup route middlewares

// var csrf = require('csurf')
// var csrfProtection = csrf({ cookie: true })

var app = express();

//app.use(cookieParser());

var credentials = require('./credentials.js');


app.use(require('cookie-parser')(credentials.cookieSecret));

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

//  app.use(cookieSession({
//    name: 'session',
//    keys: ['key1', 'key2']
// }));


 app.get('/',function (req, res) {
     
     res.cookie('smaster','go2',{signed:true});


     console.log(req.cookies);
     if(req.cookies.isVisit >0){
            var visitCount= req.cookies.isVisit;
            visitCount++;
            res.cookie('isVisit', visitCount);
            res.send('<p>第' + visitCount + req.signedCookies.smaster + '次来次页面</p>');
     }
     else{
         req.cookies.isVisit = 1;
         res.cookie('isVisit', req.cookies.isVisit);
         res.send('欢迎第一次来这里');
         console.log("Cookies: ",req.cookies);
     }
 })

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








// var session = require('express-session')
//
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))

app.use(csrf({ cookie: true }))



app.use('/', index);
app.use('/users', users);

app.use('/user', require('./api/user'));

app.use('/crash', require('./api/crash'));

app.use('/fileupload', require("./api/upload"));

app.use('/redirect', require("./api/redirect"));

// app.get('/from', csrfProtection, function (req, res) {
//     //pass the csrfToken to the view
//     //res.render('send', { csrfToken: req.csrfToken() })
//     res.send("gogo");
//     //console.log(req.session.id);
//     //res.send('you viewed this page ' +  req.session.id);
// })

app.get('/xxx', function (req, res) {
    //pass the csrfToken to the view
    //res.render('send', { csrfToken: req.csrfToken() })
    res.send("gogo");
    //console.log(req.session.id);
    //res.send('you viewed this page ' +  req.session.id);
})

// app.get('/process', csrfProtection, function (req, res) {
//     res.render('send', { csrfToken: req.csrfToken() })
// })

app.get('/process', function (req, res) {
   // res.render('send', { csrfToken: req.csrfToken() })

    res.send("token:" + req.csrfToken());
})



app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
