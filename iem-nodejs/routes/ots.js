var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');
var exceltocvs = require('../supporting_codes/excel2csv.js');


/* GET upload page for teachers. */
router.get('/upload', function(req, res, next) {
  var user = checkSession(req);

  // if(user.isLoggedIn && user.as === 'tch') {
  //     res.render('upload_form', {title: 'IEM', user: user, progress: 0, file: true});
  // }
  // else{
  //     res.redirect('404');
  // }
        res.render('upload_form', {
            title: 'Upload Excel File Here',
            error:'',
            user: user,
            progress: 0,
            file: true,
            text: false,
            multiple: false,
            subject: false});
  });


/* POST processing for upload page for teachers */
router.post('/upload', function(req, res, next) {
    var user = checkSession(req);
    var form = new formidable.IncomingForm();

    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = 'D:\\iem-package\\iem-nodejs\\Uploads\\';
    form.parse(req, function (err, fields, files) {
        // console.log('________________');
        // console.log(files.filetoupload.type);
        //if(excel_extensions.includes(files.type))
        if(files.filetoupload.name.match(/\.(xls|xlsx)$/i))
        {
           var oldpath = files.filetoupload.path;
           var newpath = 'D:\\iem-package\\iem-nodejs\\Uploads\\' + files.filetoupload.name;
           fs.rename(oldpath, newpath, function (err) {
               if (err) throw err;
               var path = exceltocvs(newpath, files.filetoupload.name);

               res.render('upload_form', {
                   title: 'Upload Excel File Here',
                   error: '',
                   user: user,
                   progress: 100,
                   file: true,
                   text: false,
                   multiple: false,
                   subject: false
               });
           });
        }
        else {
           fs.unlink(files.filetoupload.path);
           res.render('upload_form', {
               title: 'Upload Excel File Here',
               error: 'The file should be an .xls or .xlsx file.',
               user: user,
               progress: 404,
               file: true,
               text: false,
               multiple: false,
               subject: false
           });
       }
    });
});

/* GET test homepage for students*/
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    res.render('test_homepage', { title: 'IEM', user: user });
  });

  
module.exports = router;
