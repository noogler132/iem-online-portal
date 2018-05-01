module.exports = function (table, fixed_data, data) {
    console.log('__________data:' +data);
    console.log(data);
    var cm = require('csv-mysql');
    var options = {
        mysql: {
            host: 'sql12.freemysqlhosting.net',
            user: 'sql12235600',
            password: 'lK4A8DH9zz',
            database: 'sql12235600',
            port: '3306'
        },
        csv: {
            comment: null,
            quote: '`'
        },
        table: table
        // headers: ["Q_no", "Question", "Option1", "Option2", "Option3", "Option4", "Solution", "Remarks"],
        // fixedData: {test_key: fixed_data}
    };
    if(table === 'test_questions') {
        options.fixedData = {
            test_key: fixed_data
        };
    }

    console.log('--------------database starting');
    cm.import(options, data, function (err, rows) {
        if (err) throw err;
        console.log('--------------database done');
    });
};