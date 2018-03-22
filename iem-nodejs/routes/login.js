var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: req.method });

});

router.post('/', function(req, res, next) {
    var user = req.body.username;
    var pass = req.body.password;

    db.query("SELECT password FROM sample WHERE username = ?", user, function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0)
        {
            console.log("Empty/////////////////////");
            res.redirect('www.google.com');
        }
        console.log(result[0].password);
        console.log(pass);

        if(result[0].password === pass)
        {
            console.log("match");
            res.redirect('/');
        }
        else
        {
            console.log("no match");
            res.redirect('/login');
        }

    });


});


module.exports = router;
