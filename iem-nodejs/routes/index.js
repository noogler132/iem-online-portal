var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  var user = checkSession(req);
  console.log('____________');
  console.log( req.session);
  res.render('index', { title: 'IEM', user: user });
});

/* GET syllabus page */
router.get('/syllabus', function(req, res, next) {
    var user = checkSession(req);
    res.render('syllabus', { title: 'IEM', user: user });
});


/* GET contact us page */
router.get('/contact_us', function(req, res, next) {
    var user = checkSession(req);
    res.render('contact_us', { title: 'IEM', user: user });
});


/* GET About us page */
router.get('/about', function(req, res, next) {
    var user = checkSession(req);
    console.log(req.session);
    res.render('about', { title: 'IEM', user: user });
});


/* GET Notice upload page */
router.get('/notice_upload', function(req, res, next) {
    var user = checkSession(req);
    // if(user.isLoggedIn && user.as === 'tch') {
    //     res.render('upload_form', {title: 'IEM', user: user, progress: 0});
    // }
    // else{
    //     res.redirect('404');
    // }
    res.render('upload_form', {
        title: 'Upload Notice',
        error: '',
        user: user, progress: 0,
        text: true, file: true,
        multiple: true,
        subject: true
    });
});


/* POST Notice upload page */
router.post('/notice_upload', function(req, res, next) {

    var filedata = {name: '', path: ''};
    var maildata = {
        subject: '',
        text: '',
        sendfile: 0,
        file: []
    };


    var moment = require('moment');
    var user = checkSession(req);
    var form = new formidable.IncomingForm();
    var mailer = require('../supporting_codes/mailer');

    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = 'D:\\iem-package\\iem-nodejs\\Uploads\\';
    form.multiples = true;

    console.log('time to parse------');

    form.parse(req, function (err, fields, files) {

        var length = 0;

        if(files.filetoupload.size === 0)
        {
            length = 0;
            console.log(length);
        }
        else if(files.filetoupload.length === undefined)
        {
            length = 1;
        }
        else {
            length = files.filetoupload.length;
        }
        maildata.subject = fields.subject;
        maildata.text = fields.text;
        maildata.sendfile = length;
        maildata.file.length = length;

        if(length>1) {
            for (var i = 0; i < length; i++) {
                var oldpath = files.filetoupload[i].path;
                var newpath = 'D:\\iem-package\\iem-nodejs\\Uploads\\Notices\\' + user.username + '_' + moment().format('YYYY-MM-DD') + '_' + files.filetoupload[i].name;
                filedata.name = files.filetoupload[i].name;
                filedata.path = newpath;
                maildata.file[i] = filedata;


                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                });
            }
        }
        else{
            var oldpath = files.filetoupload.path;
            var newpath = 'D:\\iem-package\\iem-nodejs\\Uploads\\Notices\\' + user.username + '_' + moment().format('YYYY-MM-DD') + '_' + files.filetoupload.name;
            filedata.name = files.filetoupload.name;
            filedata.path = newpath;
            maildata.file[0] = filedata;


            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });
        }
        mailer(maildata);
        res.render('upload_form', {
            title: 'Upload Notice',
            error: '',
            user: user,
            progress: 100,
            text: true,
            file: true,
            multiple: true,
            subject: true
        });
    });
});

module.exports = router;