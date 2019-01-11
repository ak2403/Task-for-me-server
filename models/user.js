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
    project: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    }],
    tokens: {
        type: Array
    },
    is_company_added: {
        type: Boolean,
        default: false
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies'
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    is_access_granted: {
        type: Boolean,
        default: false
    }
});

const handleError = err => {
    const dict = {
        'unique': "% already exists.",
        'required': "%s is required.",
        'min': "%s below minimum.",
        'max': "%s above maximum.",
        'enum': "%s is not an allowed value."
    }

    return Object.keys(err.errors).map(key => {
        const props = err.errors[key].properties
        return dict.hasOwnProperty(props.kind) ?
            require('util').format(dict[props.kind], props.path) :
            props.hasOwnProperty('message') ?
                props.message : props.type
    })
}

userSchema.statics.addUser = function (req) {
    return new Promise((resolve, reject) => {
        this.findOne({
            useremail: req.useremail
        }, (err, user) => {
            if (err) {
                console.log("64")
                console.log(err)
            }

            if (!user) {
                const newUser = new this(req)
                newUser.save()
                    .then(user => {
                        const returnUser = {
                            id: user._id,
                            username: user.username,
                            useremail: user.useremail,
                            company: user.company,
                            is_email_verified: user.is_email_verified,
                            is_company_added: user.is_company_added
                        }
                        resolve(returnUser)
                    })
                    .catch(err => {
                        reject(handleError(err))
                    })
            } else {
                const error_obj = {
                    error: 'Email already in use'
                }
                reject(error_obj)
            }
        })
    })
}

userSchema.statics.joinUser = function (userData) {
    return new Promise((resolve, reject) => {
        this.findOne({
            useremail: userData.useremail
        }, (err, user) => {
            if (err) {
                console.log("64")
                console.log(err)
            }

            if (!user) {
                delete userData['confirm_password']
                userData['is_company_added']=true
                
                const newUser = new this(userData)
                newUser.save()
                    .then(user => {
                        const returnUser = {
                            id: user._id,
                            username: user.username,
                            useremail: user.useremail,
                            company: user.company,
                            is_email_verified: user.is_email_verified,
                            is_company_added: user.is_company_added
                        }
                        resolve(returnUser)
                    })
                    .catch(err => {
                        reject(handleError(err))
                    })
            } else {
                const error_obj = {
                    error: 'Email already in use'
                }
                reject(error_obj)
            }
        })
    })
}








userSchema.statics.updateCompany = function (userID, companyID) {
    return new Promise((resolve, reject) => {
        this.findByIdAndUpdate(userID, {
            $set: {
                "company": mongoose.Types.ObjectId(companyID),
                "is_company_added": true
            }
        }, { new: true }, function (err, user) {
            if (err) throw reject(error)

            resolve(user)
        })
    })
}

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;