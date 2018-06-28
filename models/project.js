const mongoose = require('mongoose');
const schema = mongoose.Schema;

const projectSchema = new schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
    admin: {
        type: String
    },
    issues: {
        type: Array
    },
    users: {
        type: Array
    },
    subProject: {
        type: Array
    }
});

const projectModel = mongoose.model('projects', projectSchema);
module.exports = projectModel;