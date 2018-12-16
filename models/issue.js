const mongoose = require('mongoose');
const schema = mongoose.Schema;

const issueSchema = new schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
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
        id: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true
        },
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

const issueModel = mongoose.model('issues', issueSchema);
module.exports = issueModel;