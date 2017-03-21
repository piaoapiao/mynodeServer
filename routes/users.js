var express = require('express');
var router = express.Router();

/* GET users listing. */
   router.get('/', function(req, res, next) {
       console.log("test");
  res.send('respond with ab1423234312312');
});

module.exports = router;
