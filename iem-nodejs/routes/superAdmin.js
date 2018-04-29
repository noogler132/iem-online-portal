var express = require('express');
var router = express.Router();
var checkSession = require('./isLoggedIn');
var formidable = require('formidable');
var fs = require('fs');
var exceltocvs = require('../supporting_codes/excel2csv.js');


/* GET superAdmin home page */
router.get('/', function(req, res, next) {
    res.render('superAdmin/sections', {});
});

/* GET ADD USER */
router.get('/add-user', function(req, res, next) {
    res.render('superAdmin/add-user', {});
});

/* GET STUDENT DETAILS */
router.get('/students', function(req, res, next) {
    res.render('superAdmin/student-table', {});
});

/* GET TEACHERS DETAILS */
router.get('/teachers', function(req, res, next) {
    res.render('superAdmin/teacher-table', {});
});


router.get('/subjects', function(req, res, next) {
    res.render('superAdmin/subject-table', {});
});


module.exports=router;