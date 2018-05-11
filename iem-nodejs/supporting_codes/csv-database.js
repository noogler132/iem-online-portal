module.exports = function (table, fixed_data, data) {
    console.log('__________data:' +data);
    console.log(data);
    var cm = require('csv-mysql');
    var options = {
        mysql: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'iemweb-databse',
            port: '3306'
        },
        csv: {
            comment: null,
            quote: '`'
        },
        table: table,
        // headers: ["Q_no", "Question", "Option1", "Option2", "Option3", "Option4", "Solution", "Remarks"],
        // fixedData: {test_key: fixed_data}
    };
    if(table === 'test_questions') {
        options.fixedData = {
            test_key: fixed_data
        };
    }
    console.log(options+ data);
    console.log('--------------database starting');
    cm.import(options, data, function (err, rows) {
        console.log('--------------database done');
    });
};