var fs = require('fs');
var express = require('express');
var app = express();

// `bodyParser` includes `multipart`
app.use(express.bodyParser());

app.post('/', function(req, res, next){
  // assuming <input type="file" name="upload">

  var path = req.files.upload.path;
  var name = req.files.upload.name;

  // copy...
});

