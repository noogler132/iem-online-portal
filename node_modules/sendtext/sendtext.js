// sendtext file
var exec = require('child_process').exec


var sendtext = (number, message) => {

  return exec(`curl http://textbelt.com/text -d number=${number} -d message="${message}"`,
    (error, stdout, stderr) => {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error);
      }
    })
  //return `Number ${number}, Message: ${message}`
}
module.exports.sendtext = sendtext
