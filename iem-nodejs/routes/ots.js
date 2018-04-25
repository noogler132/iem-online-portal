var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');
var exceltocvs = require('../supporting_codes/excel2csv.js');


/* GET test homepage for students*/
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    if(user.isLoggedIn && user.as === 'tch'){
        res.redirect('/online-test/edit');
        return;
    }
    var sem = 0;
    db.query("SELECT * FROM student_details WHERE u_roll = ?", '10401215076', function (err, result)
    {
        var add_year = result[0].add_year;
        var date = new Date();
        var currentyear = date.getFullYear();
        var stu_year = (currentyear - add_year);

        if(date.getMonth() >= 0 && date.getMonth() <5){
            sem = 2 * stu_year;
        }
        else if(date.getMonth() >= 5 && date.getMonth() <12) {
            sem = 1 * stu_year;
        }
        console.log('Sem: ' + sem);
        db.query("SELECT * FROM subjects WHERE sem_code = ?", sem, function (err, subjects)
        {
            console.log('Sub: ' + subjects.length);
            var query = 'SELECT * FROM active_tests WHERE sub_code IN (\'';
            query = query + subjects[0].sub_code;
            for(i=1; i<subjects.length; i++)
            {
                query = query + "', '";
                query = query + subjects[i].sub_code;
                console.log(query);
            }
            query = query + "')";
            db.query(query, function (err, active) {
                res.render('ots/stu_home', {title: 'IEM', user: user, subjects: subjects, active: active});
            });
        });
    });
});


/* Processing for selecting sem and displaying the subjects accordingly */
router.get('/edit', function(req, res, next) {
    var user = checkSession(req);
    db.query("SELECT * FROM subjects", function (err, subjects)
    {
        db.query("SELECT * FROM active_tests", function (err, active)
        {
            console.log(subjects[0].sem_code);
            res.render('ots/sem_select', {title: 'the Portal', isLoggedIn: false, user: user, err: '', subjects: subjects, active: active, sem: 3, sub_code: 'BCA301' });
        });
    });
});


router.get('/upload', function(req, res, next) {
    var user = checkSession(req);
    // if(user.isLoggedIn && user.as === 'tch') {
    //     res.render('upload_form', {title: 'IEM', user: user, progress: 0, file: true});
    // }
    // else{
    //     res.redirect('404');
    // }
    res.render('ots/tch_home', {
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
    var dir = '../iem-nodejs/Uploads/Excel to CVS/';
    var uploadtodb = require('../supporting_codes/csv-database');
    var setActiveTest = require('../supporting_codes/setactivetest');


    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = '../iem-nodejs/Uploads/';
    form.parse(req, function (err, fields, files) {
        if(files.filetoupload.size === 0) // if no file selected
        {
            res.render('ots/tch_home', {
                title: 'Upload Excel File Here',
                error: 'No file selected',
                user: user,
                progress: 404,
                file: true,
                text: false,
                multiple: false,
                subject: false
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
               exceltocvs(newpath, files.filetoupload.name, dir);

               /* Upload to Database */
               var path = dir + files.filetoupload.name.split(".",1) + ".csv";
               fs.readFile(path, function (err, data) {
                   if (err) throw err;
                   uploadtodb('test_questions', fields.subcode + '_' + fields.test_no, data);
               });
               setActiveTest(fields.subcode, fields.test_no);
               /* Database complete */


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
            /* When file is not an excel file */
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




  
module.exports = router;
