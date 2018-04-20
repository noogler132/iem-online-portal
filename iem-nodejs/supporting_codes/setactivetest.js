module.exports = function (subcode, testnumber) {
    db.query("SELECT * FROM active_tests WHERE sub_code = ? AND test_no = ?", subcode, testnumber, function (err, result, fields) {
        if(result.length === 0){
            db.query(" INSERT INTO `active_tests`(`sub_code`, `test_no`, `is_active`, `test_key`) VALUES (?,?,?,?)", subcode,
                testnumber, 1, subcode.toString()+'_'+testnumber.toString(), function (err, result, fields) {
                });
        }
    });
};