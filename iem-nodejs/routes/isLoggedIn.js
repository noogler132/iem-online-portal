var details = {isLoggedIn: '', username: ''};

module.exports = function (req){
    if(!req.session.username) {
        details = {isLoggedIn: false, username: ''}
    }
    else{
        details = {isLoggedIn: true, username: req.session.username}
    }
    console.log(details);
    return details;
};