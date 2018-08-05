// test file
var s = require('./sendtext.js')

var Koby = new Object()
Koby.number = 4052596513
Koby.message = "Hello World"


console.log(s.sendtext(Koby.number, Koby.message))
