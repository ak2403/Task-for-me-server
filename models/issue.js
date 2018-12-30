const mongoose = require('mongoose');
const Users = mongoose.model('users')
const schema = mongoose.Schema;

const issueSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    created_on: {
        type: Date,
        default: new Date
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    },
    comments: [{
        message: {
            type: 'String'
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        created_on: {
            type: Date,
            default: new Date
        },
        updated_on: {
            type: Date,
            default: new Date
        }
    }]
});


 issueSchema.statics.addIssue = function(data, userID){
     return new Promise((resolve, reject) => {
         const newIssue = new this(data)
         newIssue.save()
            .then(issue => {
                resolve(issue)
            })
            .catch(err => {
                reject(err)
            })
     })
 }


 issueSchema.statics.getIssue = function(userID){
     return new Promise((resolve, reject) => {
        Users.findById(userID, (err, user) => {
            this.find({
                'project': { $in: user.project}
            }, function(err, issues){
                resolve(issues)
            });
        })
     })
 }



const issueModel = mongoose.model('issues', issueSchema);
module.exports = issueModel;