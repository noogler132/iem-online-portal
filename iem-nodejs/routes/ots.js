var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var fs = require('fs');
var exceltocvs = require('../supporting_codes/excel2csv.js');


/* GET test homepage for students*/
router.get('/', function(req, res, next) {
    var user = checkSession(req);
    if(user.isLoggedIn && user.as === 'tch'){
        res.redirect('/online-test/edit');
        return;
    }
    if(!user.isLoggedIn && user.as !== 'stu' && user.sem !== sem){
        req.session.redirect = '/online-test';
        res.redirect('/login');
        return;
    }
    var sem = req.session.sem;
    db.query("SELECT * FROM subjects WHERE sem_code = ? and dept = ?", [sem, req.session.dept] , function (err, subjects)
    {
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
                res.render('ots/stu_home', {title: 'IEM', user: user, subjects: subjects, active: active, sem: sem});
            });
        });
});


router.post('/', function(req, res, next) {
    var user = checkSession(req);
    var sem = req.body.sem_key;
    var sub_code = req.body.sub_key;
    var redirect_var = '/online-test/'+sem+'/'+sub_code+'/';
    res.redirect(redirect_var);
});


router.get('/:sem([1-6])/:subcode(\\w+)/', function(req, res, next) {
    var user = checkSession(req);
    var sem = req.params.sem;
    // if(user.isLoggedIn && user.as === 'tch'){
    //     res.redirect('/online-test/edit');
    //     return;
    // }
    var subcode = req.params.subcode;
    // if(!user.isLoggedIn && user.as !== 'stu' && user.sem !== sem){
    //     res.redirect('/404');
    //     return;
    // }
    db.query("SELECT * FROM active_tests WHERE sub_code = ? AND is_active = 1", subcode, function (err, tests)
    {
        var query = 'SELECT * FROM results WHERE test_key LIKE \'' + req.params.subcode + '%\' and u_id = ' + '10401215076';
        db.query(query, function (err, result) {
            res.render('ots/select_test', {title: 'IEM', user: user, subcode: subcode, sem: sem, tests: tests, results: result});
        });
    });
});


router.post('/:sem([1-6])/:subcode(\\w+)/', function(req, res, next) {
    var user = checkSession(req);
    var sub_code = req.body.sub_key;
    var date = new Date();
    var test_no = req.body.test_no;
    var test_key = sub_code + '_' + test_no;
    db.query("SELECT * FROM test_questions WHERE test_key = ?", test_key, function (err, questions) {
        req.session.test = {
            sub_code: sub_code,
            test_no: test_no,
            startTime: date.getTime(),
            endTime: new Date(date.setMinutes(date.getMinutes() + questions.length +1 )).getTime()
        };
        console.log(req.session);
        res.render('ots/pre-exam', {user: user, test: 'start'})
    });

});








router.get('/start', function(req, res, next) {
    var user = checkSession(req);
    var test_key = req.session.test.sub_code + '_' + req.session.test.test_no;
    console.log(req.session);
    db.query("SELECT * FROM test_questions WHERE test_key = ?", test_key, function (err, result)
    {
        res.render('ots/exam', {title: 'IEM', user: user, question: result, sub_code:req.session.test.sub_code, test_no:req.session.test.test_no });
    });
});


router.post('/start', function(req, res, next) {
    var user = checkSession(req);
    var test_key = req.session.test.sub_code + '_' + req.session.test.test_no;
    var date = new Date();
    if(req.session.test.endTime < date.getTime()){
    res.render('message', {user: user, message: 'Unknown error occurred'});
        return;
    }
    db.query("SELECT * FROM test_questions WHERE test_key = ?", test_key, function (err, questions)
    {
        var total = questions.length;
        var answers = req.body.answers;
        var score = 0;
        for(var i=0; i<total; i++){
            console.log(answers[i] + questions[i].Solution);
            if(answers[i] === questions[i].Solution){
                score++;
                console.log(score);
            }
        }
        var resultQuery = 'Insert into results(u_id,test_key,score,total) VALUES (\''+req.session.u_id+ '\',\''+ test_key+'\','+score+','+total+')';
        console.log(resultQuery);
        db.query(resultQuery, function (err, result){
           if(err) throw err;
           req.session.test = {};
           res.render('ots/pre-exam', {user: user, test: 'end'});
        });
    });
});

/* Route for showing result to students */
router.post('/result', function(req, res, next) {
    var user = checkSession(req);
    var query = 'SELECT * FROM results WHERE test_key = \'' + req.body.sub_key + '_'+ req.body.test_no+ '\' and u_id = ' + '10401215076';
    db.query(query, function (err, result) {
        res.render('ots/result', {user: user, result: result});
    });

});









/* Route for viewing solutions */
router.get('/view-solutions', function(req, res, next) {
    var user = checkSession(req);
    res.render('ots/view_solutions', {user: user});
});








/* Teachers Routes */

/* Processing for selecting sem and displaying the subjects accordingly */
router.get('/edit', function(req, res, next) {
    var user = checkSession(req);
    db.query("SELECT * FROM subjects", function (err, subjects)
    {
            res.render('ots/sem_select', {
                title: 'the Portal',
                isLoggedIn: false,
                user: user, err: '',
                subjects: subjects,
                active: undefined,
                sem: 0,
                sub_code: '',
                dept: ''
            });
    });
});

router.post('/edit', function(req, res, next)
{
    var user = checkSession(req);
    var sub_code = req.body.sub_code;
    var sem = req.body.sem;
    var dept = req.body.dept;
    if(req.body.action === 'view'){
        res.redirect('/view-paper');
        return;
    }
    if(req.body.action !== ''){
        takeAction(req.body.action, req.body.test_key)
    }

            db.query("SELECT * FROM subjects", req.session.dept , function (err, subjects) {
                db.query("SELECT * FROM active_tests where sub_code = ? order by test_no ", sub_code, function (err, result) {
                    if (result === undefined) {
                        res.render('ots/sem_select', {
                            title: 'the Portal',
                            isLoggedIn: false,
                            user: user, err: '',
                            subjects: subjects,
                            active: undefined,
                            sem: 0,
                            sub_code: '',
                            dept: ''
                        });
                        return;
                    }
                    res.render('ots/sem_select', {
                        title: 'the Portal',
                        isLoggedIn: false,
                        user: user, err: '',
                        subjects: subjects,
                        active: result,
                        sem: sem,
                        sub_code: sub_code,
                        dept: dept
                    });
                });
            });


});




/* Delete or toggle tests */
function takeAction(action, test_key) {
    var query = '';
    console.log('--------' + action + test_key);
    if(action === 'delete'){
        console.log('delete');
        db.query( 'DELETE FROM active_tests where test_key = ? ', test_key, function (err, result) {
            if(err) throw err;
            console.log('-------- deleted from active tests');
            db.query('DELETE FROM test_questions where test_key = ?', test_key, function (err, result) {
                if(err) throw err;
                console.log('-------- deleted from ques bank');
                return 1;
            });
        });
    }
    else if(action === 'toggle'){
        console.log('toggle');
        db.query('SELECT * from active_tests WHERE test_key = ?', test_key, function (err, result) {
            if(err) throw err;
            console.log('-------first query');
            var active_state = 1;
            if(result[0].is_active){
                active_state = 0;
            }
            console.log('------'+active_state);
            db.query( 'UPDATE active_tests SET is_active = ? WHERE test_key = ?',[active_state, test_key], function (err, result) {
                if(err) throw err;
                console.log('-------- toggle done');
                return 1;
            });
        });
    }
    else{
        console.log('noaction');
        return 1;
    }
}


router.post('/view-all-result', function(req, res, next) {
    var user = checkSession(req);
    var test_key = req.body.test_key;
    // var action = req.body.action;
    var query = '';
    if(req.body.dept === undefined || req.body.add_year === undefined){
        query = 'Select * from results where test_key = \''+ test_key + '\' ;';
    }
    else{
        query = 'SELECT * FROM results, student_details where results.u_id = student_details.u_roll and results.test_key= \''+test_key+ '\' and  \n' +
            'student_details.dept = \''+req.body.dept+'\' and add_year = \''+req.body.add_year+'\';'
    }
    console.log(query);
    db.query(query, function (err, results) {
        console.log(results);
        res.render('ots/view_all_result', {user: user, results: results});
    });
});


/* GET upload page for teachers */
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
    var formidable = require('formidable');
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
