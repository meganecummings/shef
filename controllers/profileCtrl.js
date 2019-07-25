//Database
const db = require('../models');

//GET User Profile
const showProfile = (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect('/accounts/login');
    } 
    db.User.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) return res.render('index', { errors: [{ message: 'Something went wrong, please try again.'}] });
        res.render('profile/show', { currentUser: foundUser });
    });
}

module.exports = {
    showProfile
}