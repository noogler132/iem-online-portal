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

module.exports=router;