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

var compress = require('compression');
var compressible = require('compressible')

var responseTime = require('response-time')


var errorhandler = require('errorhandler')

//     res.locals._csrfToken = req.csrfToken();
//     next(); });

// setup route middlewares

// var csrf = require('csurf')
// var csrfProtection = csrf({ cookie: true })


var app = express();
// app.use(responseTime())

var server = require('http').createServer(app);

var io = require('socket.io')(server);

var i = 6;

var str = i.toString(16).toUpperCase()
console.log(str.toString(16));

var string = "d王王王王"
//for (var i = 0; i < string.length; ++i) {
    var c = string.charCodeAt(2);
console.log(c.toString(16));

io.on('connection', function(client){

    client.on('event', function(data){
        console.log(data);
    });
    client.on('disconnect', function(){});
});


function shouldCompress (req, res) {
    // if (req.headers['x-no-compression']) {
    //     // don't compress responses with this request header
    //     return false
    // }
    //
    // // fallback to standard filter function
    // return compress.filter(req, res)
    return true;
    //return false;
}

app.use(compress({filter: shouldCompress}))



//app.use(compress());

var credentials = require('./credentials.js');

app.use(cookieParser(credentials.cookieSecret));


// var session = require('cookie-session');
                                                                                 
// app.use(session({
//     secret:'12345',
//     name:'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.si
//     cookie:{maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过
//     resave:false,
//     saveUninitialized: true
// }))


// 按照上面的解释，设置 session 的可选参数
// app.use(session({
//   secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
//   cookie: { maxAge: 60 * 1000 }
// }));

// app.get('/sesssion', function (req, res) {
//     req.session.isVisit++;

//     req.session.name ="wangwangwangwangwangwangwangwangwangwang";

//     res.send(req.session.name);

//   // 检查 session 中的 isVisit 字段
//   // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
//   // if(req.session.isVisit) {
//   //   req.session.isVisit++;
//   //   res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
//   // } else {
//   //   req.session.isVisit = 1;
//   //   res.send("欢迎第一次来这里");
//   //   console.log(req.session);
//   // }
// });



app.use(morgan("short"));

//app.use('/public', serveIndex(__dirname, {'icons': true}))

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

//app.set('trust proxy', 0)

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



app.get('/awesome', function(req, res){

    //console.log("awesome:" + req.session);
    
    //req.session.sessname = 'i am a sesion';

    // req.cookies()
    //
    // res.send("You're Awesome. And the session expired time is: " + req.session.id);

    // res.send(req.sessionID);
    //

    if(req.session.lastPage) {
             console.log('Last page was: ' + req.session.lastPage + ".");
         }
         req.session.lastPage = '/awesome';
         res.send("You're Awesome. And the session expired time is: " + req.session.cookie.maxAge);

     // if(req.session.lastPage) {
     //     console.log('Last page was: ' + req.session.lastPage + ".");
     // }
     // req.session.lastPage = '/awesome'; //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。
     // res.send("You're Awesome. And the session expired time is: " + req.session.cookie.maxAge);
 });







// app.get('/home', function (req, res) {
//
//     var hour = 3600000
//     req.session.cookie.expires = new Date(Date.now() + hour)
//     req.session.cookie.maxAge = hour
//
// });

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


app.use(express.static('public'));

// app.use(express.static(path.join(__dirname, 'public'),{}));

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

// app.use(csrf({ cookie: true }))



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
