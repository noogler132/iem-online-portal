var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');

/* GET upload page for teachers. */
router.get('/upload', function(req, res, next) {
  var user = checkSession(req);
  res.render('upload_form', { title: 'IEM', user: user, progress: 0 });
});


/* POST processing for upload page for teachers */
router.post('/upload', function(req, res, next) {
    var user = checkSession(req);
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = 'D:\\iem-package\\iem-nodejs\\Uploads\\';
    form.parse(req, function (err, fields, files) {
        console.log('________________');
        console.log(files.filetoupload.type);
        //if(excel_extensions.includes(files.type))
        if(files.filetoupload.name.match(/\.(xls|xlsx)$/i))
        {
           var oldpath = files.filetoupload.path;
           var newpath = 'D:\\iem-package\\iem-nodejs\\Uploads\\' + files.filetoupload.name;
           fs.rename(oldpath, newpath, function (err) {
               if (err) throw err;z
               res.render('upload_form', {title: 'IEM', user: user, progress: 100});
           });
        }
        else {
           fs.unlink(files.filetoupload.path);
           res.render('upload_form', {title: 'IEM', user: user, progress: 404});
       }
    });
});

module.exports = router;
