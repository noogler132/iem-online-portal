var nodemailer = require('nodemailer');

var sender = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'sumankanrar420@gmail.com',
        pass : 'sumanpassword'
    }
});

var mailoptions = {
    from : 'sumankanrar420@gmail.com',
    to : 'sumankanrar25@gmail.com',
    subject : 'Nodemailer',
    text : 'Hello from nodemailer'
};

sender.sendMail(mailoptions, function(error, info) {
    if(error) {
        console.log(error);
    }
    else {
        console.log('Email sent:');
    }
});