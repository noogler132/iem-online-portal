var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res) {
  var user = checkSession(req);
  res.render('index/index', { title: 'IEM', user: user });
});

/* GET syllabus page */
router.get('/syllabus', function(req, res) {
    var user = checkSession(req);
    res.render('index/syllabus', { title: 'IEM', user: user });
});

/* GET timetable page */
router.get('/timetable', function(req, res) {
    var user = checkSession(req);
    res.render('index/timetable', {title: 'IEM', user: user});

});

/* GET Academic Calendar Page */
router.get('/calendar', function(req, res) {
    var user = checkSession(req);
    res.render('index/calendar', {title: 'IEM', user: user});
});


/* GET contact us page */
router.get('/contact_us', function(req, res) {
    var user = checkSession(req);
    res.render('index/contact_us', { title: 'IEM', user: user });
});


/* GET About us page */
router.get('/about', function(req, res) {
    var user = checkSession(req);
    res.render('index/about', { title: 'IEM', user: user });
});







/* GET Notice upload page */
router.get('/notice_upload', function(req, res) {
    var user = checkSession(req);
    if(!user.isLoggedIn) {
        req.session.redirect = '/notice_upload';
        res.redirect('/login');
        return;
    }
    else if(user.as !== 'tch'){
        res.render('message', {user: user, message: 'Only Teachers has access to this page'});
        return;
    }
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
router.post('/notice_upload', function(req, res) {

    var user = checkSession(req);
    if(!user.isLoggedIn) {
        req.session.redirect = '/notice_upload';
        res.redirect('/login');
        return;
    }
    else if(user.as !== 'tch'){
        res.render('message', {user: user, message: 'Only Teachers has access to this page'});
        return;
    }
    var filedata = {name: '', path: ''};
    var maildata = {
        subject: '',
        text: '',
        sendfile: 0,
        file: []
    };
    var moment = require('moment');
    var form = new formidable.IncomingForm();
    var mailer = require('../supporting_codes/mailer');

    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = 'D:\\iem-package\\iem-nodejs\\Uploads\\';
    form.multiples = true;

    form.parse(req, function (err, fields, files) {
        if(fields.subject === undefined || fields.text === undefined || fields.dept === undefined || fields.add_year === undefined){
            fs.unlink(files.filetoupload.path, function (err) {});
            res.render('upload_form', {
                title: 'Upload Notice',
                error: 'Unknown Error Occured Please Retry',
                user: user,
                progress: 0,
                text: true,
                file: true,
                multiple: true,
                subject: true
            });
            return;
        }
        if(fields.subject === '' || fields.text === ''){
            fs.unlink(files.filetoupload.path, function (err) {});
            res.render('upload_form', {
                title: 'Upload Notice',
                error: 'Subject and Details fields are compulsory.',
                user: user,
                progress: 0,
                text: true,
                file: true,
                multiple: true,
                subject: true
            });
            return;
        }
        if(fields.dept === '' || fields.add_year === ''){
            fs.unlink(files.filetoupload.path, function (err) {
            });
            res.render('upload_form', {
                title: 'Upload Notice',
                error: 'Please select department and batch.',
                user: user,
                progress: 0,
                text: true,
                file: true,
                multiple: true,
                subject: true
            });
            return;
        }
        var length = 0;
        if(files.filetoupload.size === 0)
        {
            length = 0;
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
        if(files.filetoupload.size === 0){
            fs.unlink(files.filetoupload.path, function (err) {
            });
        }
        if(length !== 0 && files.filetoupload.size !== 0) {
            if (length > 1) {
                for (var i = 0; i < length; i++) {
                    var oldpath = files.filetoupload[i].path;
                    var newpath = './Uploads/Notices/' + user.username + '_' + moment().format('YYYY-MM-DD') + '_' + files.filetoupload[i].name;
                    filedata.name = files.filetoupload[i].name;
                    filedata.path = newpath;
                    maildata.file[i] = filedata;
                    fs.rename(oldpath, newpath, function (err) {
                    });
                }
            }
            else {
                var oldpath = files.filetoupload.path;
                var newpath = './Uploads/Notices/' + user.username + '_' + moment().format('YYYY-MM-DD') + '_' + files.filetoupload.name;
                filedata.name = files.filetoupload.name;
                filedata.path = newpath;
                maildata.file[0] = filedata;
                fs.rename(oldpath, newpath, function (err) {
                });
            }
        }
        db.query("SELECT email FROM student_details where dept = ? and add_year = ? ",[fields.dept, fields.add_year] , function (err, result) {
            if (result.length > 0) {
                mailer(maildata, result);
            }
        });
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






















/* GET mats upload page */
router.get('/mail-mats', function(req, res) {
    var user = checkSession(req);
    if(!user.isLoggedIn) {
        req.session.redirect = '/notice_upload';
        res.redirect('/login');
        return;
    }
    else if(user.as !== 'tch'){
        res.render('message', {user: user, message: 'Only Teachers has access to this page'});
        return;
    }
    res.render('upload_form', {
        title: 'Mail Study Materials',
        error: '',
        user: user, progress: 0,
        text: true, file: true,
        multiple: true,
        subject: true
    });
});

/* POST materials upload page */
router.post('/mail-mats', function(req, res) {

    var user = checkSession(req);
    if(!user.isLoggedIn) {
        req.session.redirect = '/notice_upload';
        res.redirect('/login');
        return;
    }
    else if(user.as !== 'tch'){
        res.render('message', {user: user, message: 'Only Teachers has access to this page'});
        return;
    }
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

    form.parse(req, function (err, fields, files) {
        if(fields.subject === undefined || fields.text === undefined || fields.dept === undefined || fields.add_year === undefined){
            fs.unlink(files.filetoupload.path, function (err) {});
            res.render('upload_form', {
                title: 'Upload Notice',
                error: 'Unknown Error Occured Please Retry',
                user: user,
                progress: 0,
                text: true,
                file: true,
                multiple: true,
                subject: true
            });
            return;
        }
        if(fields.subject === '' || fields.text === ''){
            fs.unlink(files.filetoupload.path, function (err) {
            });
            res.render('upload_form', {
                title: 'Mail Study Materials',
                error: 'Subject and Details fields are compulsory.',
                user: user,
                progress: 0,
                text: true,
                file: true,
                multiple: true,
                subject: true
            });
            return;
        }
        if(fields.dept === '' || fields.add_year === ''){
            fs.unlink(files.filetoupload.path, function (err) {
            });
            res.render('upload_form', {
                title: 'Mail Study Materials',
                error: 'Please select department and batch.',
                user: user,
                progress: 0,
                text: true,
                file: true,
                multiple: true,
                subject: true
            });
            return;
        }
        var length = 0;

        if(files.filetoupload.size === 0)
        {
            length = 0;
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

        if(files.filetoupload.size === 0){
            fs.unlink(files.filetoupload.path, function (err) {
            });
        }
        if(length !== 0&& files.filetoupload.size !== 0) {
            if (length > 1) {
                for (var i = 0; i < length; i++) {
                    var oldpath = files.filetoupload[i].path;
                    var newpath = './Uploads/Notices/' + user.username + '_' + moment().format('YYYY-MM-DD') + '_' + files.filetoupload[i].name;
                    filedata.name = files.filetoupload[i].name;
                    filedata.path = newpath;
                    maildata.file[i] = filedata;


                    fs.rename(oldpath, newpath, function (err) {
                    });
                }
            }
            else {
                var oldpath = files.filetoupload.path;
                var newpath = './Uploads/Notices/' + user.username + '_' + moment().format('YYYY-MM-DD') + '_' + files.filetoupload.name;
                filedata.name = files.filetoupload.name;
                filedata.path = newpath;
                maildata.file[0] = filedata;


                fs.rename(oldpath, newpath, function (err) {
                });
            }
        }
        db.query("SELECT email FROM student_details where dept = ? and add_year = ? ",[fields.dept, fields.add_year] , function (err, result) {
            if (result.length > 0) {
                mailer(maildata, result);
            }
        });
        res.render('upload_form', {
            title: 'Mail Study Materials',
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