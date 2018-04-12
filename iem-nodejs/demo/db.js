
var mysql = require('mysql');

// var con = mysql.createConnection({
//     host            : 'sql12.freemysqlhosting.net',
//     user            : 'sql12227644',
//     password        : '7tYVzbipQi',
// });


// var con = mysql.createConnection({
//   host            : '000webhost.com',
//   user            : 'id2612763_student_data',
//   password        : 'password',
//   database        : 'id2612763_students'
// });



var con = mysql.createConnection({
    host: 'johnny.heliohost.org',
    user: 'iemweb_dbuser',
    password: 'webuser141132',
    database: 'iemweb_database'
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});