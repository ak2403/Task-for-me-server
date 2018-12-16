const mongoose = require('mongoose');
const _ = require('lodash')
const Users = mongoose.model('users')
const schema = mongoose.Schema;

const companySchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    projects: [{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }]
});

companySchema.statics.addCompany = function (data) {
    return new Promise((resolve, reject) => {
        this.find({ name: data.name })
            .then(findRes => {
                if (_.isEmpty(findRes)) {
                    const newCompany = new this(data)
                    newCompany.save().then(saveRes => {
                        Users.updateCompany(data.created_by, saveRes._id)
                            .then(userData => {
                                resolve(userData)
                            })
                            .catch(err => {
                                reject(err)
                            })
                    })
                        .catch(err => {
                            reject(err)
                        })
                } else {
                    const error_message = new Error('Company is already in use')
                    reject(error_message)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

const companyModel = mongoose.model('companies', companySchema);
module.exports = companyModel;