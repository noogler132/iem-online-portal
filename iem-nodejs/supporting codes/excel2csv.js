module.exports = function (fileIn, fileName) {
    var xlsx = require('node-xlsx');
    var fs = require('fs');
    var obj = xlsx.parse(fileIn); // parses a file
    var rows = [];
    var writeStr = "";
    var upoadtodb = require('./csv-database');

    //looping through all sheets
    for (var i = 0; i < obj.length; i++) {
        var sheet = obj[i];
        //loop through all rows in the sheet
        for (var j = 0; j < sheet['data'].length; j++) {
            //add the row to the rows array
            rows.push(sheet['data'][j]);
        }
    }

    //creates the csv string to write it to a file
    for (var i = 0; i < rows.length; i++) {
        writeStr += rows[i].join(",") + "\n";
    }

    //writes to a file, but you will presumably send the csv as a
    //response instead
    var dir ="D:\\iem-package\\iem-nodejs\\Uploads\\Excel to CVS\\";
    fs.writeFile(dir + fileName.split(".", 1) + ".csv", writeStr, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("test.csv was saved in the current directory!");
        var path = dir + fileName.split(".",1) + ".csv";
        console.log('-----------------csv done');
        fs.readFile(path, function (err, data) {
            if (err) throw err;
            upoadtodb(data);
        });
    });

};