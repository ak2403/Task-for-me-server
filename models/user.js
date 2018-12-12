const mongoose = require('mongoose');
const _ = require('lodash')
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    project: {
        type: String
    },
    company: {
        type: String
    },
    is_email_verified: {
        type: Boolean,
        default: false
    }
});

userSchema.statics.addUser = function (req) {
    return new Promise((resolve, reject) => {
        this.find({ useremail: req.useremail })
            .then(findRes => {
                if (_.isEmpty(findRes)) {
                    const newUser = new this(req)
                    newUser.save().then(saveRes => {
                        resolve(saveRes)
                    })
                        .catch(err => {
                            reject(err)
                        })
                } else {
                    const error_message = new Error('Email is already in use')
                    reject(error_message)
                }
            })
    })
}

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;