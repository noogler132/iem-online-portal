var details = {isLoggedIn: '', username: '', as: '', sem: 0};

module.exports = function (req){
    if((!req.session.username) && (!req.session.password)) {
        details = {isLoggedIn: false, username: '', as: '', sem: 0}
    }
    else{
        details = {isLoggedIn: true, username: req.session.username, as: req.session.as, sem: req.session.sem}
    }
    console.log(details);
    return details;
};