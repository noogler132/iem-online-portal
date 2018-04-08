var details = {isLoggedIn: '', username: '', as: ''};

module.exports = function (req){
    if(!req.session.username) {
        details = {isLoggedIn: false, username: '', as: ''}
    }
    else{
        details = {isLoggedIn: true, username: req.session.username, as: req.session.as}
    }
    console.log(details);
    return details;
};