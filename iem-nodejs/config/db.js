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



    bcrypt.hash('00000000', 8, function(err, hash) {
        // Store hash in your password DB.
        db.query("UPDATE student_auth SET password = ? WHERE u_roll = 10401215076", hash, function (err, r) {
            if (err) throw err;
            console.log(r);
        })

    });



// db.query("SELECT * FROM student_auth WHERE u_roll = ?", u, function (err, result) {
//     if (err) throw err;
//     var p = result[0];
//     var a  = p.password;
//     console.log(a);
//     bcrypt.compare('00000000', a, function(err, res) {
//         console.log(res);
//     });
// });

