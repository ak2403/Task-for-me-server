const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String
    },
    useremail: {
        type: String
    },
    password: {
        type: String
    },
    project: {
        type: String
    }
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;