var mysql = require('mysql');

db = mysql.createConnection({
    host: 'johnny.heliohost.org',
    user: 'iemweb_141132',
    password: 'password14131',
    database: 'iemweb_database'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//console.log(con);
//app.con = con;

module.exports = db;

var user = '10401215076';
db.query("SELECT * FROM student_auth WHERE u_roll = ?", user, function (err, result) {
    var u = result[0];
    if (err) throw err;
    console.log(u);
    console.log(u.password);
    console.log(u.u_roll);
});