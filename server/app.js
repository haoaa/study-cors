/*jslint nodejs: true*/

'use strict';

var express = require('express'),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    app = express();

/* -------------------------------------------------------------------------- */

app.get('/no-cors', function(req, res){
  res.json({
    text: 'You should not see this via a CORS request.'
  });
});

/* -------------------------------------------------------------------------- */
// The default configuration is the equivalent of:
// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.get('/simple-cors', cors(corsOptions), function(req, res){
  res.json({
    text: 'Simple CORS requests are working. [GET]'
  });
});
app.head('/simple-cors', cors(), function(req, res){
  res.send(204);
});
app.post('/simple-cors', cors(), function(req, res){
  res.json({
    text: 'Simple CORS requests are working. [POST]'
  });
});

/* -------------------------------------------------------------------------- */
var corscomplex = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
  methods:['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: 'x',
  credentials:true,
  maxAge:3800
}
app.options('/complex-cors', cors(corscomplex));
app.del('/complex-cors', cors(), function(req, res){
  res.json({
    text: 'Complex CORS requests are working. [DELETE]'
  });
});

/* -------------------------------------------------------------------------- */

var issue2options = {
  origin: true,
  methods: ['POST'],
  credentials: true,
  maxAge: 3600
};
app.options('/issue-2', cors(issue2options));
app.post('/issue-2', cors(issue2options), function(req, res){
  res.json({
    text: 'Issue #2 is fixed.'
  });
});

if(!module.parent){
  app.listen(port, function(){
    console.log('Express server listening on port ' + port + '.');
  });
}
