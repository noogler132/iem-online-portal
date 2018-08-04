var mysql = require('mysql');

// db = mysql.createConnection({
//     host: 'johnny.heliohost.org',
//     user: 'iemweb_141132',
//     password: 'password14131',
//     database: 'iemweb_database'
// });

// db = mysql.createConnection({
//     host: 'localhost',
//     user: 'id5584948_iemweb_141132',
//     password: 'password14131',
//     database: 'id5584948_iemweb_database'
// });

/* free mysql hosting */
// db = mysql.createConnection({
//     host: 'sql12.freemysqlhosting.net',
//     user: 'sql12235600',
//     password: 'lK4A8DH9zz',
//     database: 'sql12235600',
//     port: '3306'
// });


/* mysql workbench */
 /*db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'mysql',
     database: 'iemweb-databse',
     port: '3306'
 }); */

/* WAMP */
db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'iemweb-database',
    port: '3306'
});


db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = db;
//
// var user = '10401215076';
// var password = '$2a$08$mVxsmqHsoOwh123H2ErmSOdkCT52M43.1ViNTCMEx1tFAdxlDbISG';
// db.query("SELECT * FROM auth WHERE u_id = ?", user, function (err, result) {
//     var u = result[0];
//     if (err) throw err;
//     console.log(u);
// });