const db = require('../models');

function getTime() {
    return new Date().toLocaleString();
};

module.exports = {
    index: (req, res) => {
        db.User.find({}, (err, foundUsers) => {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again',
            });
            res.status(200).json({
                status: 200,
                data: foundUsers,
                requestedAt: getTime()
            });
        });
    },
    
    show: (req, res) => {
        db.User.findOne(req.params.name, (err, foundUser) => {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again',
            });
            res.status(200).json({
                status: 200,
                data: foundUser,
                requestedAt: getTime()
            });
        });
    },
    
    new: (req, res) => {
        const newUser = req.body;
        db.User.create(newUser, (err, createdUser) => {
            if (err) return res.status(400).json({
                status: 400,
                message: 'Something went wrong, please try again',
            });
            res.status(200).json({
                status: 201,
                data: createdUser,
                requestedAt: getTime(),
            });
        });
    },
}
