
module.exports = function (maildata, toMail) {

    var nodemailer = require('nodemailer');

    var sender = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '465',
        secure: 'true',
        auth: {
            user: 'iem.portal141@gmail.com',
            pass: 'IEMweb141132'
        }
    });

    var mailoptions = {
        from: 'iem.portal141@gmail.com',
        to: toMail,
        attachments: []
    };

    // var maildata = {
    //     text: "maildata text working",
    //     sendfile: 2,
    //     file: [
    //         {
    //             name: 'sample12.xlsx',
    //             path: 'D:\\iem-package\\sample12.xlsx'
    //
    //         },
    //         {
    //             name: 'sample.xlsx',
    //             path: 'D:\\iem-package\\sample.xlsx'
    //         }
    //
    //     ]
    // };

    console.log(maildata);
    if(maildata.subject){
        mailoptions.subject = maildata.subject;
    }

     if(maildata.text){
         mailoptions.text = maildata.text;
     }

    if(maildata.html){
        mailoptions.html = maildata.html;
    }

    if(maildata.sendfile > 0){
         for(var i = 0; i < maildata.sendfile; i++) {
             mailoptions.attachments[i] = {
                 filename: maildata.file[i].name,
                 path: maildata.file[i].path
             }
         }
    }

    // sender.verify(function(error, success) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Server is ready to take our messages');
    //     }
    // });

    sender.sendMail(mailoptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: %S', info);
        }
    });

};