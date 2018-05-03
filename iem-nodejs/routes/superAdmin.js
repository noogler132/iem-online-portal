var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');
var exceltocvs = require('../supporting_codes/excel2csv.js');
var bcrypt = require('bcryptjs');


/* GET superAdmin home page */
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    if(!user.isLoggedIn || user.as !== 'admin') {
        ;
    }
    res.render('superAdmin/sections', {});
});

/* GET USER AUTH TABLE */
router.get('/view-user', function(req, res, next) {
    db.query('Select * from auth order by u_id', function (err, result) {
        if(err) throw err;
        res.render('superAdmin/auth-table', {err: '', users: result});    });
});

/* GET ADD USER */
router.get('/add-user', function(req, res, next) {
    res.render('superAdmin/add-user', {err: ''});
});

/* POST ADD USER */
router.post('/add-user', function(req, res, next) {
    var u_id = req.body.u_id;
    var email = req.body.email;
    var log_as = req.body.log_as;
    if(u_id === '' || email === '' || log_as !== 'stu' || log_as !== 'tch'){
        var err = 'All fields are mandatory';
        res.render('superAdmin/add-user', {err: err});
        return;
    }
    insertQuery(u_id, email, log_as);
    res.render('superAdmin/add-user', {err: ''});
});

/* GET ADD USER */
router.get('/add-user-uploadxls', function(req, res, next) {
    res.render('superAdmin/add-user-uploadxls', {error: '', progress: 0});
});

router.post('/add-user-uploadxls', function(req, res, next) {
    var formidable = require('formidable');
    var user = checkSession(req);
    var form = new formidable.IncomingForm();
    var dir = '../iem-nodejs/Uploads/Excel to CVS/';
    var uploadtodb = require('../supporting_codes/csv-database');

    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = '../iem-nodejs/Uploads/';
    form.parse(req, function (err, fields, files) {
        if(files.filetoupload.size === 0) // if no file selected
        {
            res.render('superAdmin/add-user-uploadxls', {
                error: 'No file selected',
                progress: 404
            });
            return;
        }
        if(files.filetoupload.name.match(/\.(xls|xlsx)$/i)) //if file is an excel document
        {
            var oldpath = files.filetoupload.path;
            var newpath = '../iem-nodejs/Uploads/' + files.filetoupload.name;

            fs.rename(oldpath, newpath, function (err)
            {
                if (err) throw err;

                /* Transform to CSV */
                if(exceltocvs(newpath, files.filetoupload.name, dir)) {
                    /* Upload to Database */
                    var path = dir + files.filetoupload.name.split(".", 1) + ".csv";
                    console.log(path);
                    fs.readFile(path, function (err, data) {
                        if (err) throw err;
                        console.log(data);
                        uploadtodb('auth','', data);
                    });
                }
                res.render('superAdmin/add-user-uploadxls', {
                    error: '',
                    progress: 100
                });
            });
        }
        else {
            /* When file is not an excel file */
            fs.unlink(files.filetoupload.path);
            res.render('superAdmin/add-user-uploadxls', {
                error: 'The file should be an .xls or .xlsx file.',
                progress: 404
            });
        }
    });

});



/* Send OTP */
function insertQuery(u_id, email, log_as) {
    console.log('password');
    var password = Math.floor(Math.random() * 99999999) + 105555;
    /* Set new user password */
    var hash = bcrypt.hashSync(password.toString(), 8);
    // Store hash in your password DB.
    console.log('------hash:' + hash);
    // Store hash in your password DB.
    console.log('-------inside');
    var arr = [u_id, hash];
    db.query('INSERT INTO auth(u_id, email, password, log_as) VALUES (?,?,?,?) ', [u_id, email, hash, log_as], function (err, result) {
        if(err) throw err;
    });
    doMail(email, password);
}

/* mail function */
function doMail(mail, password){
        var mailer = require('../supporting_codes/mailer');
    var maildata = {
        subject: '',
        text: '',
        sendfile: 0,
        file: []
    };
        maildata.subject = 'IEM STUDENT PORTAL LOGIN';
        maildata.text = 'To Login use your University Roll Number as Username and ' + password + ' as your password';
        mailer(maildata, mail);
}


/* GET STUDENT DETAILS */
router.get('/students', function(req, res, next) {
    db.query('Select * from student_details order by \'u_roll\'', function (err, result) {
        if(err) throw err;
        res.render('superAdmin/student-table',
            {
                student: result,
                dept: '',
                add_year: ''});
    });
});

router.post('/students', function(req, res, next) {
    var add_year = req.body.add_year;
    var dept = req.body.dept;
    var query = '';
    if( add_year !== undefined && dept !== undefined){
        query = 'Select * from student_details where dept = \''+dept+'\' and add_year = '+add_year+' order by \'u_roll\'';
    }
    else if(add_year !== undefined && dept === undefined){
        query = 'Select * from student_details where add_year = '+add_year+' order by \'u_roll\'';
    }
    else if(add_year === undefined && dept !== undefined){
        query = 'Select * from student_details where dept = \'' + dept +'\' order by \'u_roll\' ' ;
    }
    console.log(query);
    db.query(query, function (err, result) {
        if(err) throw err;
        res.render('superAdmin/student-table', {student: result, dept: dept, add_year: add_year});
    });
});

/* GET STUDENT UPDATE PAGE */
router.get('/update-student', function(req, res, next) {
  res.render('superAdmin/student_update');
});

/* GET TEACHER UPDATE PAGE */
router.get('/update-teacher', function(req, res, next) {
    res.render('superAdmin/teacher_update');
});

/* GET SUBJECT UPDATE PAGE */
router.get('/add-subject', function(req, res, next) {
    res.render('superAdmin/add-subject');
});

/* GET SUBJECT UPDATE PAGE */
router.get('/add-subject', function(req, res, next) {
    res.render('superAdmin/subject_add');
});

/* GET TEACHERS DETAILS */
router.get('/teachers', function(req, res, next) {
    db.query('Select * from teacher_details', function (err, result) {
        if(err) throw err;
        res.render('superAdmin/teacher-table', {teacher: result});
    });
});


router.get('/subjects', function(req, res, next) {
    db.query('Select * from subjects', function (err, result) {
        if(err) throw err;
        res.render('superAdmin/subject-table', {subjects: result});
    });
});


module.exports=router;