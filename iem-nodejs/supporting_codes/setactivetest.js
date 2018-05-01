module.exports = function (subcode, testnumber) {
// var db = require('../config/dbconfig');
// var subcode = 'BCA101';
// var testnumber = '1';
    db.query('SELECT * FROM active_tests WHERE sub_code = ? AND test_no = ? ', [subcode, testnumber] , function (err, result, fields) {
        if(result.length === 0){
            db.query(" INSERT INTO `active_tests`(`sub_code`, `test_no`, `is_active`, `test_key`) VALUES (?,?,?,?)", [subcode,
                testnumber, 1, subcode+'_'+testnumber], function (err, result, fields) {
                if(err) throw err;
                });
        }
    });
};