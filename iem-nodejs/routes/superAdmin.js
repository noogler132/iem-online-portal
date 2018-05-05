var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var fs = require('fs');
var exceltocvs = require('../supporting_codes/excel2csv.js');
var bcrypt = require('bcryptjs');


/* GET superAdmin home page */
router.get('/', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    res.render('superAdmin/sections', {err: ''});
});

/* GET USER AUTH TABLE */
router.get('/view-user', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    db.query('Select * from auth order by u_id', function (err, result) {
        res.render('superAdmin/auth-table', {err: '', users: result});    });
});

/* GET ADD USER */
router.get('/add-user', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    res.render('superAdmin/add-user', {err: ''});
});

/* POST ADD USER */
router.post('/add-user', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    var u_id = req.body.u_id;
    var email = req.body.email;
    var log_as = req.body.log_as;
    if(u_id === '' || email === '' || log_as !== 'stu' || log_as !== 'tch' ||
    u_id === undefined || email === undefined || log_as === undefined){
        var err = 'All fields are mandatory';
        res.render('superAdmin/add-user', {err: err});
        return;
    }
    insertQuery(u_id, email, log_as);
    res.render('superAdmin/add-user', {err: ''});
});

/* Send OTP */
function insertQuery(u_id, email, log_as) {
    var password = Math.floor(Math.random() * 99999999) + 105555;
    /* Set new user password */
        var hash = bcrypt.hashSync(password.toString(), 8);
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


/* GET ADD USER */
router.get('/add-user-uploadxls', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    res.render('superAdmin/add-user-uploadxls', {error: '', progress: 0});
});


router.post('/add-user-uploadxls', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    var formidable = require('formidable');
    var form = new formidable.IncomingForm();
    var dir = '../iem-nodejs/Uploads/Excel to CVS/';
    var uploadtodb = require('../supporting_codes/csv-database');

    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = '../iem-nodejs/Uploads/';
    form.parse(req, function (err, fields, files) {
        if(files.filetoupload.size === 0) // if no file selected
        {
            fs.unlink(files.filetoupload.path);
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





/* GET STUDENT DETAILS */
router.get('/students', function(req, res, next) {
    // if(!validateAdmin(req, res)){
    //     return;
    // }
    db.query('Select * from student_details order by \'u_roll\'', function (err, result) {
        res.render('superAdmin/student-table',
            {
                student: result,
                dept: '',
                add_year: ''});
    });
});

router.post('/students', function(req, res, next) {
    // if(!validateAdmin(req, res)){
    //     return;
    // }
    var add_year = req.body.add_year;
    var dept = req.body.dept;
    if(req.body.action === 'update') {
        if (updateStudent(req, res)) {
            return;
        }
    }
    else if(req.body.action === 'delete'){
        deleteStudent(req);
    }
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
    else{
        query = 'Select * from student_details order by \'u_roll\' ' ;

    }
    db.query(query, function (err, result) {

        res.render('superAdmin/student-table', {student: result, dept: dept, add_year: add_year});
    });
});

/* GET STUDENT UPDATE PAGE */
function updateStudent(req, res) {
    db.query('select * from student_details where u_roll = ?', req.body.u_roll, function (err, result) {
        res.render('superAdmin/student_update', {details: result, err: ''});
    });
    return 1;
}

/* POST STUDENT UPDATE PAGE */
router.post('/update-student/', function(req, res, next) {
    // if(!validateAdmin(req, res)){
    //     return;
    // }
    var u_id = req.body.u_id;
    var email = req.body.email;
    var u_reg = req.body.u_reg;
    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var dob = req.body.dob;
    var contact = req.body.contact;
    var dept = req.body.dept;
    var add_year = req.body.add_year;
    db.query('select * from student_details where u_roll = ?', u_id, function (err, result) {
        if(result.length === 0){
            res.render('superAdmin/student_update', {details: result, err: 'This user is not registered'});
        }
        if (u_id === undefined || email === undefined || u_reg === undefined || f_name === undefined || l_name === undefined || dob === undefined ||
            dept === undefined || add_year === undefined || contact === undefined) {
                res.render('superAdmin/student_update', {details: result, err: 'All fields are mandatory'});
                return;
        }
        if (u_id === '' || email === '' || u_reg === '' || f_name === '' || l_name === '' || dob === '' || dept === '' || add_year === ''
            || contact === '' ) {
                res.render('superAdmin/student_update', {details: result, err: 'All fields are mandatory'});
                return;
        }
        var oldEmail = result[0].email;
        if(oldEmail !== email){
            var ok = 0;
            var query = 'update auth set email = \''+email+'\' where u_id = ' + u_id;
            db.query(query , function (err, result) {
                if(result === undefined){
                    ok = 1;
                }
            });
            if(ok){
                res.render('superAdmin/student_update', {details: result, err: 'This email is already in use.'});
                return;
            }
        }
        dob = new Date(dob);
        var arr = [u_id, email, u_reg, f_name, l_name, dob, dept, add_year, contact];
        db.query("Insert into student_details(u_roll, email, u_reg, f_name, l_name, dob, dept, add_year, contact) values (?,?,?,?,?,?,?,?,?)",
            arr, function (err, result, fields) {
                res.redirect('/superAdmin/students');
            });
    });

});

/* GET TEACHER UPDATE PAGE */
router.get('/update-teacher', function(req, res, next) {
    res.render('superAdmin/teacher_update');
});

/* GET SUBJECT UPDATE PAGE */
router.get('/add-subject', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    res.render('superAdmin/add-subject');
});

/* GET SUBJECT UPDATE PAGE */
router.get('/add-subject', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    res.render('superAdmin/subject_add');
});

/* GET TEACHERS DETAILS */
router.get('/teachers', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    db.query('Select * from teacher_details', function (err, result) {
        if(err) throw err;
        res.render('superAdmin/teacher-table', {teacher: result});
    });
});


router.get('/subjects', function(req, res, next) {
    if(!validateAdmin(req, res)){
        return;
    }
    db.query('Select * from subjects', function (err, result) {
        if(err) throw err;
        res.render('superAdmin/subject-table', {subjects: result});
    });
});


/* GET superAdmin login page */
router.get('/login', function(req, res, next) {

    if(req.session.isLoggedIn) {
        if(req.session.redirect !== ''){
            res.redirect(req.session.redirect)
        }
        else {
            res.redirect('/superAdmin');
        }
        return;
    }
    res.render('superAdmin/login', {err: ''});
});



/* POST admin login page. */
router.post('/login', function(req, res, next) {
    if (req.session.isLoggedIn) {
        if (req.session.redirect !== '') {
            res.redirect(req.session.redirect)
        }
        else {
            res.redirect('/superAdmin/');
        }
        return;
    }
    var username = req.body.username;
    var pass = req.body.password;
    if(username === undefined || pass === undefined){
        res.render('superAdmin/sections', {user: user, err:'Incorrect Username or Password'});
        return;
    }
    db.query("SELECT * FROM auth WHERE u_id = ? and log_as = 'adm' ", username, function (err, result) {
        if (result.length === 0) {
            res.render('superAdmin/login', {err:'Incorrect Username or Password'});
        }
        else {
            bcrypt.compare(pass, result[0].password, function (err, pass) {
                if (pass) {
                    req.session.isLoggedIn = true;
                    req.session.username = 'Admin';
                    req.session.as = result[0].log_as;
                    req.session.password = result[0].password;
                    req.session.email = result[0].email;
                    if (req.session.redirect !== '' && req.session.redirect) {
                        res.redirect(req.session.redirect);
                    }
                    else {
                        res.redirect('/superAdmin');
                    }
                }
                else{
                    res.render('superAdmin/login', {err:'Incorrect Username or Password'});
                }
            });
        }
    });
});

function validateAdmin(req, res) {
    if(!req.session.isLoggedIn){
        req.session.redirect = '/superAdmin';
        res.redirect('/superAdmin/login');
        return 0;
    }
    if(req.session.as !== 'adm'){
        var checkSession = require('isLoggedIn');
        res.render('message', {user: checkSession(req), message: 'Access Denied'});
        return 0;
    }
    return 1;
}

module.exports=router;