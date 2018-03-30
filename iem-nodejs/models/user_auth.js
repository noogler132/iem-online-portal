var bcrypt   = require('bcrypt');

// define the schema for our user model
var userSchema = {
    username: this.u_roll,
    email: this.email,
    password: this.password
};


// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = userSchema;
