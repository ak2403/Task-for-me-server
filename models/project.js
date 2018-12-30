const mongoose = require('mongoose')
const _ = require('lodash')
const Users = mongoose.model('users')
const Company = mongoose.model('companies')
const schema = mongoose.Schema;

const projectSchema = new schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies'
    },
    created_on: {
        type: Date,
        default: new Date
    },
    updated_on: {
        type: Date,
        default: new Date
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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

projectSchema.statics.addProject = function (data, userID) {
    return new Promise((resolve, reject) => {
        Users.findById(userID, (err, user) => {
            if (err) {
                const error_message = {
                    invalid_user: true,
                    message: 'Invalid User'
                }
                return reject(error_message)
            }

            let project_data = {
                ...data,
                company: user.company,
                created_by: userID
            }
            const new_project = new this(project_data)

            new_project.save().then(function (project) {
                Users.findByIdAndUpdate(userID, {
                    $push: {
                        project: project._id
                    }
                },
                    { new: true },
                    (err, updatedUser) => {
                        if(err){

                        }
                        return resolve(project)
                    })
            })

        })
    })
}

projectSchema.statics.getProject = function (user) {
    return new Promise((resolve, reject) => {
        Company.findOne({ created_by: user })
            .then(response => {
                this.find({
                    company: response._id
                }, function (err, proj) {
                    resolve(proj)
                })
            })
    })
}

const projectModel = mongoose.model('projects', projectSchema);
module.exports = projectModel;