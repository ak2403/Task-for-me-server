const mongoose = require('mongoose');
const _ = require('lodash')
const schema = mongoose.Schema;

const userSchema = new schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies'
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
                        const returnObj = {
                            id: saveRes._id,
                            company: saveRes.company
                        }
                        resolve(returnObj)
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

userSchema.statics.updateCompany = function (userID, companyID) {
    return new Promise((resolve, reject) => {
        this.findByIdAndUpdate(userID, {
            $set: { 
              "company": mongoose.Types.ObjectId(companyID)
            }
          }, {new: true}, function (err, user) {
              if (err) throw reject(error)
              
              resolve(user)
          })
    })
}

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;