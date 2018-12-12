const mongoose = require('mongoose');
const schema = mongoose.Schema;

const projectSchema = new schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
    company: {
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
    issues: {
        type: Array
    },
    users: {
        type: Array
    }
});

const projectModel = mongoose.model('projects', projectSchema);
module.exports = projectModel;