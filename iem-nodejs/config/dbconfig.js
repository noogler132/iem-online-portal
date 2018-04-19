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
var password = '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG';
db.query("SELECT * FROM auth WHERE u_id = ?", user, function (err, result) {
    var u = result[0];
    if (err) throw err;
    console.log(u);
});