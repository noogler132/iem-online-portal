module.exports = function (fileIn, fileName, newdir) {
    var xlsx = require('node-xlsx');
    var fs = require('fs');
    var obj = xlsx.parse(fileIn); // parses a file
    var rows = [];
    var writeStr = "";
    // var uploadtodb = require('../supporting_codes/csv-database');
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
    for (var i = 2; i < rows.length; i++) {
        writeStr+= "`";
        writeStr += rows[i].join("`,`");
        writeStr += "`";
        writeStr += "\n";
    }

    //writes to a file, but you will presumably send the csv as a
    //response instead
    fs.writeFile(newdir + fileName.split(".", 1) + ".csv", writeStr, function (err) {
        if (err) {
            return console.log(err);
        }
    });
    return 1;
};