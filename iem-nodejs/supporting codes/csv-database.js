module.exports = function (data) {
    console.log('__________data:');
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
            quote: null
        },
        table: 'online_test',
        headers: ["Question", "Option1", "Option2", "Option3", "Option4", "Solution", "Remarks"],
        fixedData: {subject_code: 111}
    };
    console.log('--------------database starting');
    cm.import(options, data, function (err, rows) {
        if (err === null) err = false;
        // expect(err).to.equal(false);
        // done();
        console.log('--------------database working');
    });
    console.log('--------------database done');
};