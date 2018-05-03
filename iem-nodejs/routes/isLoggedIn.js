var details = {isLoggedIn: '', username: '', as: '', sem: 0};

module.exports = function (req){
    if((!req.session.username) && (!req.session.password)) {
        details = {isLoggedIn: false, username: '', as: '', sem: 0}
    }
    else{
        if(req.session.as === 'stu'){
            details = {isLoggedIn: true, username: req.session.username, as: req.session.as, sem: req.session.sem}
        }
        else if(req.session.as === 'tch'){
            details = {isLoggedIn: true, username: req.session.username, as: req.session.as, sem: 0}
        }
        else if(req.session.as === 'admin'){
            details = {isLoggedIn: true, username: req.session.username, as: req.session.as, sem: 0}
        }
        else{
            details = {isLoggedIn: false, username: '', as: '', sem: 0}
        }
    }
    console.log(details);
    return details;
};