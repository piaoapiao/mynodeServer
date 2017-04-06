'use strict';
function login(req, res, next) {
  res.type('text/plain');
  // res.staus(200);
  res.send("login ok");
  
}

// module.exports.login = login;

module.exports = {
  login:login
}