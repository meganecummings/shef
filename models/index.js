const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/shef';

mongoose.connect(DB_URL, {
    userNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log(`MongoDB is connected`))
    .catch((err) => console.log(err));

module.exports = {
    User: require('./User'),
    Recipe: require('./Recipe')
}