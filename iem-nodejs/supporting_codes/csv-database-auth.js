module.exports = function (table, data) {
    console.log('__________data:' +data);
    console.log(data);
    var cm = require('csv-mysql');
    var options = {
        mysql: {
            host: 'johnny.heliohost.org',
            user: 'iemweb_141132',
            password: 'password14131',
            database: 'iemweb_database'
        },
        csv: {
            comment: '#',
            quote: '`'
        },
        table: table
        // headers: ["Q_no", "Question", "Option1", "Option2", "Option3", "Option4", "Solution", "Remarks"],
        // fixedData: {
        //     log_as: fixed_data
        // }
    };

    console.log('--------------database starting');
    cm.import(options, data, function (err, rows) {
        if (err) throw err;
        // expect(err).to.equal(false);
        // done();
        console.log('--------------database working');
    });
    console.log('--------------database done');
};