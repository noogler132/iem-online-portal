var db = require('./dbconfig');
var bcrypt = require('bcrypt');

var u = '10401215076';
// db.query("SELECT * FROM student_auth WHERE u_roll = ?", u, function (err, result) {
//     if (err) throw err;
//     var h = bcrypt.hashSync(result.password, bcrypt.genSaltSync(8), null);
//     console.log(h);
//     db.query("UPDATE student_auth SET password = ? WHERE u_roll = ?", h , u, function (err, r) {
//         if (err) throw err;
//         console.log(r);
//     } )
// });


bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash('12345678', salt, function(err, hash) {
        // Store hash in your password DB.
        db.query("UPDATE student_auth SET password = ? WHERE u_roll = 10401215076", hash, function (err, r) {
            if (err) throw err;
            console.log(r);
        })

    });
});